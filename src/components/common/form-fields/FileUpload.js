'use strict';

import { EventEmitter } from 'events';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import objectAssign from 'object-assign';
import axios from 'axios';

const styles = {
    progressWrapper: {
        height: '10px',
        marginTop: '10px',
        width: 'calc(100% - 30px)',
        float: 'left',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
    },
    progressBar: {
        float: 'left',
        width: '0',
        height: '100%',
        fontSize: '12px',
        lineHeight: '20px',
        color: '#fff',
        textAlign: 'center',
        backgroundColor: '#96ed89',
        WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
        WebkitTransition: 'width .6s ease',
        Otransition: 'width .6s ease',
        transition: 'width .6s ease',
    },
    cancelButton: {
        marginTop: '3px',
        WebkitAppearance: 'none',
        padding: '0 5px',
        cursor: 'pointer',
        background: '0 0',
        border: 0,
        float: 'left',
        fontSize: '21px',
        fontWeight: 700,
        lineHeight: 1,
        color: '#000',
        textShadow: '0 1px 0 #fff',
        filter: 'alpha(opacity=20)',
        opacity: '.2',
    },
};

class FileUpload extends React.Component {
    files = {};
    constructor(props) {
        super(props);
        this.proxy = new EventEmitter();
        this.state = {
            progress: -1,
            hasError: false,
        };
    }

    cancelUpload() {
        this.proxy.emit('abort');
        this.setState({
            progress: -1,
            hasError: false,
        });
    }

    onChange(e) {
        e.preventDefault();
        this.files = e.target.files;
        this.setState({
            progress: 0,
            hasError: false,
        }, this._doUpload);
    }

    removeFile(e) {
        const {props} = this;
        let newValue = {
            'id': null,
            'file_type': null,
            'url': null,
        };
        props.onChange({
            target: {
                ...props,
                value: newValue,
            },
        });
    }

    renderImage(props) {
        if (props.value.thumb_url) {
            return (
                <div>
                    <img src={props.value.thumb_url} title={props.value.title}/>
                    <span onClick={(e) => this.removeFile(e)}>X</span>
                </div>
            )
        }
        return null;
    }

    renderLink(props) {
        if (props.value.url) {
            return (
                <div>
                    <a href={props.value.url} target="_blank">{props.value.title}</a>
                    <span onClick={(e) => this.removeFile(e)}>X</span>
                </div>
            )
        }
        return null;
    }

    formRenderer = (onChange, props) => {
        return (
            <div className={props.wrapperClass}>
                {props.label ?
                    <label className={props.labelClass}>
                        {props.label}
                        {props.required && <span className="required">*</span>}
                    </label>
                    : ''
                }
                {
                    (props.value.file_type === 'image') ? this.renderImage(props) : this.renderLink(props)
                }
                <input type="file" name="file_upload" onChange={onChange} className="form-control"/>
            </div>)
    };

    render() {
        const formElement = this.formRenderer(this.onChange.bind(this), this.props);
        // const progessElement = this.props.progressRenderer(
        //     this.state.progress, this.state.hasError, this.cancelUpload.bind(this));

        return (
            <div>
                {formElement}
                {/*{progessElement}*/}
            </div>
        );
    }

    _getFormData() {
        if (this.props.formGetter) {
            return this.props.formGetter();
        }
        return new FormData(ReactDom.findDOMNode(this.refs.form));
    }

    _doUpload() {
        const {props} = this;
        let files = this.files;
        for(let i=0; i < files.length ; i++) {
            const form = this._getFormData();
            form.append('file_upload', files[i]);
            form.append('file_field', props.fieldName);

            //TODO: may be better way rather then using the self
            let self = this;
            let url = (props.url) ? props.url : '/api/upload';
            axios.post(url, form, {
                // onUploadProgress(e) {
                //     let progress = 0;
                //     if (e.total !== 0) {
                //         progress = parseInt((e.loaded / e.total) * 100, 10);
                //     }
                //     self.setState({
                //         progress,
                //     }, () => {
                //         self.props.onProgress(e, e.request, progress);
                //     });
                // }
            })
                .then((e)=>{
                    let response = JSON.parse(e.request.response);
                    let newValue = {
                      'id': response.upload_id,
                      'file_type': response.type,
                      'url': response.url,
                    };
                    if(newValue.file_type === 'image') {
                        newValue.thumb_url = response.urls.thumb;
                    }
                    props.onChange({
                        target: {
                            ...props,
                            value: newValue,
                        },
                    });
                })
                .catch((error) => {
                    alert("Something went wrong!");
                });
        }
    }
}

FileUpload.propTypes = {
    url: PropTypes.string,
    formGetter: PropTypes.func,
    progressRenderer: PropTypes.func,
    formCustomizer: PropTypes.func,
    beforeSend: PropTypes.func,
    onProgress: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    onAbort: PropTypes.func,
    wrapperClass: PropTypes.string,
    labelClass: PropTypes.string
};

FileUpload.defaultProps = {
    wrapperClass: "form-group",
    labelClass: "control-label",
    progressRenderer: (progress, hasError, cancelHandler) => {
        if (hasError || progress > -1) {
            const barStyle = objectAssign({}, styles.progressBar);
            barStyle.width = `${progress}%`;

            let message = (<span>Uploading ...</span>);
            if (hasError) {
                barStyle.backgroundColor = '#d9534f';
                message = (<span style={{ color: '#a94442' }}>Failed to upload ...</span>);
            }
            if (progress === 100) {
                message = (<span >Successfully uploaded</span>);
            }

            return (
                <div className="_react_fileupload_progress_content">
                    <div style={styles.progressWrapper}>
                        <div className="_react_fileupload_progress_bar" style={barStyle}/>
                    </div>
                    <button
                        className="_react_fileupload_progress_cancel"
                        style={styles.cancelButton}
                        onClick={cancelHandler}>
                        <span>&times;</span>
                    </button>
                    <div style={{ clear: 'left' }}>
                        {message}
                    </div>
                </div>
            );
        }
        return '';
    },

    formCustomizer: (form) => form,
    beforeSend: (request) => request,
    onProgress: (e, request, progress) => {},
    onLoad: (e, request) => {},
    onError: (e, request) => {},
    onAbort: (e, request) => {}
};

export default FileUpload;
