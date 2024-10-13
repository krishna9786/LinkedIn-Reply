// Importing the CountButton component from the features directory.
import { CountButton } from "~features/CountButton"

// Importing the main CSS styles for the popup.
import "~style.css"

// Defining the main component for the index popup.
function IndexPopup() {
  return (
    // A container for the popup with Flexbox styles for centering.
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      {/* Rendering the CountButton component inside the container */}
      <CountButton />
    </div>
  )
}

// Exporting the IndexPopup component as the default export.
export default IndexPopup
