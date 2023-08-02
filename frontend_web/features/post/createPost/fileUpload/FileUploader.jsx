import FileInput from "./FileInput";
import FilePreview from "./FilePreview";

export default function FileUploader({ file, setFile, accept }) {
    const removeFile = (e) => {
        setFile(null);
    };

    return (
        <div className="file-uploader">
            <FileInput
                file={file}
                setFile={setFile}
                accept={accept}
            />
            <div className="bg-white w-full mx-auto">
                <FilePreview file={file} />
            </div>
            {file && (
                <button
                    className="remove-file-btn w-full text-center text-white p-2 "
                    onClick={removeFile}
                >
                    Click here to remove file
                </button>
            )}
        </div>
    );
}
