// Importing CSS as text from the specified style file.
import cssText from "data-text:~style.css"

// Importing types and configurations from the Plasmo framework.
import type { PlasmoCSConfig, PlasmoGetOverlayAnchorList } from "plasmo"

// Importing React and necessary hooks.
import React, { useState } from "react"

// Importing icons from React Icons library.
import { HiSparkles } from "react-icons/hi"
import { FaWandMagicSparkles } from "react-icons/fa6";

// Importing the PromptModal component.
import PromptModal from "~features/PromptModal";

// Configuring the content script to run on LinkedIn URLs.
export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

// Function to create and return a <style> element with the imported CSS.
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText // Set the style content to the imported CSS text
  return style // Return the created style element
}

// Function to get a list of anchor elements for overlay placement.
export const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async () =>
  document.querySelectorAll(".msg-form__contenteditable p") // Selecting the content-editable paragraphs in LinkedIn messages

// Function to return a unique ID for the shadow host element.
export const getShadowHostId = () => "plasmo-inline-example-unique-id"

// Main component for the Plasmo overlay.
const PlasmoOverlay = (props) => {
  // State to manage focus and modal open/close.
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Getting the textarea from the props.
  const textarea = props.anchor.element
  // Selecting the main content-editable area for LinkedIn messages.
  const focus = document.querySelector(".msg-form__contenteditable");

  // Function to handle clicks outside the focus area.
  function handleClickOutside(event) {
    if (!focus.contains(event.target)) {
      setIsFocused(false); // If clicked outside, set focus state to false
    }
    if (focus.contains(event.target)) {
      setIsFocused(true); // If clicked inside, set focus state to true
    }
  }

  // Adding the click event listener to the document.
  document.addEventListener('click', handleClickOutside);

  return (
    <div>
      {/* Conditional rendering based on focus state */}
      {isFocused && (
        <div className="absolute top-24 -right-[38rem] bg-white rounded-full p-2 cursor-pointer shadow-md">
          {/* Icon displayed based on modal state */}
          {isOpen ? (
            <HiSparkles className="text-xl text-[#3b82f6]" />
          ) : (
            <FaWandMagicSparkles
              onClick={() => setIsOpen(true)} // Open the modal when clicked
              className="text-xl text-[#3b82f6]"
            />
          )}
        </div>
      )}
      {/* Render the PromptModal component with necessary props */}
      <PromptModal textarea={textarea} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

// Exporting the PlasmoOverlay component as default.
export default PlasmoOverlay
