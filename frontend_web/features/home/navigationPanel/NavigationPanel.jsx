import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHashtag, faGlobe } from "@fortawesome/free-solid-svg-icons";
import NavigationBtn from "@/features/home/navigationPanel/NavigationBtn";

export default function NavigationPanel() {
  return (
    <>
      <div className="flex flex-row justify-between">
        <NavigationBtn 
          type="Search"
          icon={
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                fontSize="25px"
                style={{color: "#ffffff",}}
            />
            }
        />

        <NavigationBtn 
          type="Hashtags"
          icon={
            <FontAwesomeIcon
                icon={faHashtag}
                fontSize="25px"
                style={{color: "#ffffff",}}
            />
            }
        />

        <NavigationBtn 
          type="Global"
          icon={
            <FontAwesomeIcon
                icon={faGlobe}
                fontSize="25px"
                style={{color: "#ffffff",}}
            />
            }
        />
      </div>
    </>
  );
}
