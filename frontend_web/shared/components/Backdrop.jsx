export default function Backdrop ({ show, onClick }) {
    return show ? (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={onClick}
        />
    )   : null;
}
