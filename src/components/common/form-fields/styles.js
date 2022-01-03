const styles = {
    root: {
        border: '0 solid #95ed89',
        padding: 0
    },
    dropTargetStyle: {
        border: '3px dashed #95ed89',
        paddingTop: 40,
        paddingRight: 10,
        paddingBottom: 40,
        paddingLeft: 10,
        backgroundColor: 'rgba(149, 237, 137, 0.12)',
        cursor: 'pointer'
    },
    dropTargetActiveStyle: {
        backgroundColor: '#ccffcc'
    },
    placeHolderStyle: {
        paddingLeft: '20%',
        paddingRight: '20%',
        textAlign: 'center'
    },
    uploadButtonStyle: {
        width: '100%',
        marginTop: 10,
        height: 32,
        alignSelf: 'center',
        cursor: 'pointer',
        backgroundColor: '#fefcea',
        border: '1px solid #f2e745',
        fontSize: 14
    },
    fileset: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    fileDetails: {
        paddingTop: 10,
        display: 'flex',
        alignItems: 'flex-start'
    },
    fileName: {
        flexGrow: '8'
    },
    fileSize: {
        float: 'right',
        flexGrow: '2',
        alignSelf: 'flex-end'
    },
    removeButton: {
        alignSelf: 'flex-end'
    },
    progress: {
        WebkitAppearance: 'none',
        appearance: 'none',
        marginTop: 10,
        width: '100%',
        height: 16
    }
};

export default styles;