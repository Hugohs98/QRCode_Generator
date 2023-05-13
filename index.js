const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

/* These lines of code are initializing variables with default values. */
const defaultUrl = "https://github.com/Hugohs98";
let colorLight = "#fff",    
    colorDark = "#000",
    text = defaultUrl,
    size = 300;

/**
 * The function handles a dark color input and generates a QR code.
 * @param e - The parameter "e" is an event object that is passed as an argument to the function. It
 * represents the event that triggered the function, such as a user clicking on an input field or
 * changing its value. In this case, it is used to get the value of the input field that triggered the
 */
function handleDarkColor(e){
    colorDark = e.target.value;
    generateQRCode();
}

/**
 * The function handles the selection of a color for a QR code's light modules.
 * @param e - The parameter "e" is an event object that is passed to the function "handleLightColor".
 * It contains information about the event that triggered the function, such as the target element and
 * the type of event. In this case, it is used to get the value of the input element that triggered the
 */
function handleLightColor(e){
    colorLight = e.target.value;
    generateQRCode();
}

/**
 * The function handles the input of a QR code text value and generates a QR code based on that value.
 * @param e - The parameter "e" is an event object that is passed to the function "handleQRText". It
 * contains information about the event that triggered the function, such as the target element and the
 * type of event. In this case, it is likely a "change" or "input" event on an
 */
function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
    generateQRCode();
}

/**
 * This function generates a QR code with specified parameters and updates a download link with the QR
 * code data URL.
 */
async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
};

/**
 * The function handles sharing a QR code image file and title using the Web Share API.
 */
async function handleShare() {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("Your browser doesn't support sharing.");
        }
    }, 100);
};

/**
 * The function handles the size input for generating a QR code.
 * @param e - The parameter "e" is an event object that is passed to the function "handleSize" when it
 * is called. It contains information about the event that triggered the function, such as the target
 * element and the type of event. In this case, it is likely an event object for a change event
 */
function handleSize(e) {
    size = e.target.value;
    generateQRCode();
};

/**
 * The function resolves a promise with a data URL of a canvas element after a 50ms timeout.
 * @returns A Promise object is being returned.
 */
function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if(img.currentSrc) {
                return;
            };
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
};

generateQRCode();
