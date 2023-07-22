import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function NotificationBtn() {

    return (
        <> 
            <div
                className=""
            >
                <button>
                    <Link href={`/notifications`}>
                        <FontAwesomeIcon
                            icon={faBell}
                            fontSize="20px"
                            style={{color: "#3734a6",}}
                        />
                    </Link>
                </button>
            </div>
        </>
    );
}
