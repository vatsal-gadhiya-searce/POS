import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultStyles from './styles';
import axios from 'axios';

class MultipleFileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [],rows: props.value, styles: Object.assign({}, defaultStyles, props.styles) };
        this.activeDrag = 0;
        this.xhrs = [];
        this.onClick = this.onClick.bind(this);
        this.onUploadButtonClick = this.onUploadButtonClick.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.files = [];
    }

    onClick() {
        this.fileInput.click();
    }

    onUploadButtonClick() {
        this.upload();
    }

    onFileSelect() {
        const items = this.filesToItems(this.fileInput.files);
        this.setState({ items }, () => {
            if (this.props.auto) {
                this.upload();
            }
        });
    }

    onDragEnter() {
        this.activeDrag += 1;
        this.setState({ isActive: this.activeDrag > 0 });
    }

    onDragOver(e) {
        if (e) {
            e.preventDefault();
        }
        return false;
    }

    onDragLeave() {
        this.activeDrag -= 1;
        if (this.activeDrag === 0) {
            this.setState({ isActive: false });
        }
    }

    onDrop(e) {
        if (!e) {
            return;
        }
        e.preventDefault();
        this.activeDrag = 0;
        const droppedFiles = e.dataTransfer ? e.dataTransfer.files : [];
        const items = this.filesToItems(droppedFiles);

        this.setState({ isActive: false, items }, () => {
            if (this.props.auto) {
                this.upload();
            }
        });
    }

    clearIfAllCompleted() {
        if (this.props.clearTimeOut > 0) {
            const completed = this.state.items.filter(item => item.progress === 100).length;
            if (completed === this.state.items.length) {
                //this.props.onLoad(this.files);
                setTimeout(() => {
                    this.setState({ items: [] });
                }, this.props.clearTimeOut);
            }
        }
    }

    updateFileProgress(index, progress) {
        const newItems = [...this.state.items];
        newItems[index] = Object.assign({}, this.state.items[index], { progress });
        this.setState({ items: newItems }, this.clearIfAllCompleted);
    }

    updateFileChunkProgress(index, chunkIndex, progress) {
        const newItems = [...this.state.items];
        const currentItem = this.state.items[index];
        const newProgressArr = [...currentItem.chunkProgress];
        const totalProgress = newProgressArr.reduce((a, b) => a + b) / (newProgressArr.length - 1);
        // -1 because there is always single chunk for "0" percentage pushed as chunkProgress.push(0) in method filesToItems)
        newProgressArr[chunkIndex] = progress;
        newItems[index] = Object.assign({}, currentItem, { chunkProgress: newProgressArr, progress: totalProgress });
        this.setState({ items: newItems }, this.clearIfAllCompleted);
    }

    cancelFile(index) {
        const newItems = [...this.state.items];
        newItems[index] = Object.assign({}, this.state.items[index], { cancelled: true });
        if (this.xhrs[index]) {
            this.xhrs[index].upload.removeEventListener('progress');
            this.xhrs[index].removeEventListener('load');
            this.xhrs[index].abort();
        }
        this.setState({ items: newItems });
    }

    upload() {
        const items = this.state.items;
        if (items) {
            items.filter(item => !item.cancelled).forEach(item => {
                this.uploadItem(item);
            });
        }
    }

    uploadItem(item) {
        if (this.props.chunks && item.file) {
            const BYTES_PER_CHUNK = this.props.chunkSize;
            const SIZE = item.file.size;

            let start = 0;
            let end = BYTES_PER_CHUNK;

            const chunkProgressHandler = (percentage, chunkIndex) => {
                this.updateFileChunkProgress(item.index, chunkIndex, percentage);
            };
            let chunkIndex = 0;
            while (start < SIZE) {
                this.uploadChunk(item.file.slice(start, end), (chunkIndex += 1), item.file.name, chunkProgressHandler);
                start = end;
                end = start + BYTES_PER_CHUNK;
            }
        } else {
            this.MultipleFileUpload(item.file, progress => this.updateFileProgress(item.index, progress));
        }
    }

    uploadChunk(blob, chunkIndex, fileName, progressCallback) {
        if (blob) {
            const formData = new FormData();
            const xhr = new XMLHttpRequest();

            formData.append('file_upload', blob, `${fileName}-chunk${chunkIndex}`);
            formData.append('file_field', this.props.fieldName);

            xhr.onload = () => {
                progressCallback(100, chunkIndex);
            };
            xhr.upload.onprogress = e => {
                if (e.lengthComputable) {
                    progressCallback(e.loaded / e.total * 100, chunkIndex);
                }
            };
            xhr.open(this.props.method, this.props.url, true);
            xhr.send(formData);
        }
    }

    MultipleFileUpload(file, progressCallback) {

        const {props} = this;
        let url = props.url ? props.url : '/api/upload';

        if (file) {
            const formData = new FormData();

            formData.append('file_upload', file, file.name);
            formData.append('file_field', this.props.fieldName);

            axios.post(url, formData, {
                onUploadProgress(e) {
                    if (e.lengthComputable) {
                        progressCallback(e.loaded / e.total * 100);
                    }
                }
            })
                .then((e)=>{
                    progressCallback(100);
                    let response = e.data;
                    let selectedValue = props.value;
                    let newValue = {
                        id: response.upload_id,
                        file_type: response.type,
                        url: response.url,
                    };
                    if(newValue.file_type === 'image') {
                        newValue.thumb_url = response.urls.thumb;
                    }
                    selectedValue.push(newValue);
                    props.onChange({
                        target: {
                            ...props,
                            value: selectedValue,
                        },
                    });
                })
                .catch((error) => {
                    // if (error.response.status === 422) {
                    //     if (error.response && error.response.data) {
                    //         this.props.onError(error, error.response.data);
                    //     }
                    // }
                });
            this.xhrs[file.index] = axios;



        }
    }

    filesToItems(files) {
        const fileItems = Array.prototype.slice.call(files);
        const items = fileItems.map((f, i) => {
            if (this.props.chunks) {
                const chunkProgress = [];
                for (let j = 0; j <= f.size / this.props.chunkSize; j += 1) {
                    chunkProgress.push(0);
                }
                return { file: f, index: i, progress: 0, cancelled: false, chunkProgress };
            }
            return { file: f, index: i, progress: 0, cancelled: false };
        });
        return items;
    }

    humanFileSize(bytes, si) {
        var thresh = si ? 1000 : 1024;
        if(Math.abs(bytes) < thresh) {
            return bytes + " B";
        }
        var units = si
            ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
            : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while(Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + " " + units[u];
    }

    renderDropTarget() {
        const { uploadIconClass } = this.props;
        const { styles } = this.state;
        let dropTargetStyle = styles.dropTargetStyle;
        if (this.state.isActive) {
            dropTargetStyle = Object.assign({}, dropTargetStyle, styles.dropTargetActiveStyle);
        }
        return (
            <div
                data-test-id="dropTarget"
                style={dropTargetStyle}
                onClick={this.onClick}
                onDragEnter={this.onDragEnter}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
            >
                <div style={styles.placeHolderStyle} className="inbox-modal-upload">
                    <p>{this.props.dropzoneLabel}</p>
                    <i className={uploadIconClass} />
                </div>
                {this.renderFileSet()}
            </div>
        );
    }

    renderFileSet() {
        const items = this.state.items;
        const { progressClass, filesetTransitionName: transitionName } = this.props;
        if (items.length > 0) {
            const { cancelIconClass, completeIconClass } = this.props;
            const { progress, styles } = this.state;
            const cancelledItems = items.filter(item => item.cancelled === true);
            const filesetStyle = items.length === cancelledItems.length ? { display: 'none' } : styles.fileset;
            return (
                <TransitionGroup
                    component="div"
                >
                    <div style={filesetStyle}>
                        {items.filter(item => !item.cancelled && !!item.file).map(item => {
                            const file = item.file;
                            const iconClass = item.progress < 100 ? cancelIconClass : completeIconClass;
                            return (
                                <div key={item.index}>
                                    <div style={styles.fileDetails}>
                                        <span className="icon-file icon-large">&nbsp;</span>
                                        <span style={styles.fileName}>{`${file.name}, ${file.type}`}</span>
                                        <span style={styles.fileSize}>{`${this.humanFileSize(file.size)}`}</span>
                                        <i
                                            className={iconClass}
                                            style={{ cursor: 'pointer' }}
                                            onClick={e => {
                                                e.stopPropagation();
                                                this.cancelFile(item.index);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <progress
                                            style={progressClass ? {} : styles.progress}
                                            className={progressClass}
                                            min="0"
                                            max="100"
                                            value={item.progress}
                                        >
                                            {item.progress}%
                                        </progress>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </TransitionGroup>
            );
        }
        return (
            <TransitionGroup
                component="div"
            />
        );
    }

    renderButton() {
        const { styles } = this.state;
        const displayButton = !this.props.auto;
        if (displayButton) {
            return (
                <button style={styles.uploadButtonStyle} onClick={this.onUploadButtonClick}>
                    {this.props.buttonLabel}
                </button>
            );
        }
        return null;
    }

    renderInput(props) {
        return (
            <div className={props.wrapperClass}>
                {props.label ?
                    <label className={props.labelClass}>
                        {props.label}
                        {props.required && <span className="required">*</span>}
                    </label>
                    : ''
                }
                <input
                    multiple={true}
                    type="file"
                    ref={c => {
                        if (c) {
                            this.fileInput = c;
                        }
                    }}
                    onChange={this.onFileSelect}
                    className="form-control"
                />
                {/*<div className="btn btn-primary btn-filled">Upload</div>*/}
            </div>
        );
    }

    componentWillReceiveProps (nextProps){
        if ('value' in nextProps) {
            this.setState({
                rows: nextProps.value,
            });
        }
    }

    removeFile(fileKey) {
        let rows = this.state.rows.filter((s, sidx) => fileKey !== sidx);
        this.setState({
            rows: rows
        });
        const {props} = this;
        props.onChange({
            target: {
                ...props,
                value: rows,
            },
        });
    }

    renderImage(file, fileKey) {
        if (file.thumb_url) {
            return (
                <div key={fileKey}>
                    <img src={file.thumb_url} title={file.title}/>
                    <span onClick={(e) => this.removeFile(fileKey)}>X</span>
                </div>
            )
        }
        return null;
    }

    renderLink(file, fileKey) {
        if (file.url) {
            return (
                <div key={fileKey}>
                    <a href={file.url} target="_blank">{file.title}</a>
                    <span onClick={(e) => this.removeFile(fileKey)}>X</span>
                </div>
            )
        }
        return null;
    }

    renderFile (file, fileKey) {
        if(file.file_type === 'image') {
            return this.renderImage(file, fileKey);
        }
        return this.renderLink(file, fileKey);
    }

    renderFiles(value) {
        return (
            <div className="multiupload-item">
                {value.map((file, fileKey) => this.renderFile(file, fileKey))}
            </div>
        );
    }

    render() {
        const { styles } = this.state;
        const { value } = this.props;
        return (
            <div>
                {/*{this.renderButton()}*/}
                {this.renderInput(this.props)}
                {this.renderFiles(value.slice())}
            </div>
        );
    }
}

MultipleFileUpload.propTypes = {
    url: PropTypes.string,
    method: PropTypes.string,
    auto: PropTypes.bool,
    fieldName: PropTypes.string,
    buttonLabel: PropTypes.string,
    dropzoneLabel: PropTypes.string,
    chunks: PropTypes.bool,
    chunkSize: PropTypes.number,
    maxFiles: PropTypes.number,
    clearTimeOut: PropTypes.number,
    filesetTransitionName: PropTypes.string,
    styles: PropTypes.shape({}),
    cancelIconClass: PropTypes.string,
    completeIconClass: PropTypes.string,
    uploadIconClass: PropTypes.string,
    progressClass: PropTypes.string,
    onChange: PropTypes.func,
    wrapperClass: PropTypes.string,
    labelClass: PropTypes.string,
};

MultipleFileUpload.defaultProps = {
    method: 'POST',
    auto: true,
    fieldName: 'datafile',
    buttonLabel: 'Upload',
    dropzoneLabel: 'Drag and drop your files here or pick them from your computer',
    maxSize: 25 * 1024 * 1024,
    chunks: false,
    chunkSize: 512 * 1024,
    localStore: false,
    maxFiles: 1,
    encrypt: false,
    clearTimeOut: 3000,
    filesetTransitionName: 'fileset',
    cancelIconClass: 'fa fa-close',
    completeIconClass: 'fa fa-check',
    uploadIconClass: 'fa fa-upload',
    wrapperClass: "form-group",
    labelClass: "control-label",
};

export default MultipleFileUpload;