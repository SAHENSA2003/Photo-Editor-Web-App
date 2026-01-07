let filters = {
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    },
    Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    },
    Hue_Rotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: 'deg'
    },
    Blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: 'px'
    },
    Grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%'
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: '%'
    },
    Invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: '%'
    }
}
function ResetFilter() {
    filters = {
        Brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: '%'
        },
        Contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: '%'
        },
        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: '%'
        },
        Hue_Rotate: {
            value: 0,
            min: 0,
            max: 360,
            unit: 'deg'
        },
        Blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: 'px'
        },
        Grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: '%'
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        Opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: '%'
        },
        Invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: '%'
        }
    }
}

const chooseInput = document.querySelector('#choose');
const ResetButton = document.querySelector('#Reset-btn');
const DownloadButton = document.querySelector('#Download-btn');
const Filters = document.querySelector('.filters');
const _Canvas = document.querySelector('#canvas');
// const ImagePlaceholder=document.querySelector('')
const CanvasCtx = _Canvas.getContext("2d");
const PresetContainer = document.querySelector('.presets');


let image = null;
let file = null;
let PhotoFileName = null;
let FilterTimer = null;
let isEditing = false;

function applyFilterOptimize() {
    clearTimeout(FilterTimer);
    FilterTimer = setTimeout(() => {
        applyFilter();
    }, 20);
}

function CreateFilter(name, uint = '%', value, max, min) {
    const div = document.createElement('div')
    div.classList.add('filter');

    let InputElement = document.createElement('input');
    InputElement.type = 'range';
    InputElement.name = name;
    InputElement.value = value;
    InputElement.max = max;
    InputElement.min = min;

    InputElement.addEventListener('input', () => {
        filters[name].value = InputElement.value;
        applyFilterOptimize();
    })

    let p = document.createElement('p');
    p.innerText = name;
    div.append(p)
    div.append(InputElement)


    return div;
}
// Making Filters with the help of the filters Object
function MakingFilter() {
    for (const filter in filters) {

        let AFilter = CreateFilter(filter, '%', filters[filter].value, filters[filter].max, filters[filter].min);
        Filters.appendChild(AFilter);
    }
}
MakingFilter();

// Choosing Image
chooseInput.addEventListener('change', (e) => {
    if (!e.target.files || !e.target.files.length) {
        return
    }

    file = e.target.files[0];
    PhotoFileName = (e.target.files[0].name);
    let img = new Image();
    let ObjectURL = URL.createObjectURL(file)
    img.src = ObjectURL;


    img.onload = () => {
        image = img;
        isEditing = true;
        document.querySelector('.ImagePlaceHolder').style.display = 'none';
        document.querySelector('#canvas').style.display = 'block';
        const MaxEditWidth = 1200;
        let Ratio = img.height / img.width;

        if (img.width > MaxEditWidth) {
            _Canvas.width = MaxEditWidth;
            _Canvas.height = MaxEditWidth * Ratio;
        } else {
            _Canvas.width = img.width;
            _Canvas.height = img.height;
        }
        CanvasCtx.drawImage(img, 0, 0, _Canvas.width, _Canvas.height);
        URL.revokeObjectURL(ObjectURL);
    }

    ResetFilter();
    document.querySelector('.filters').innerHTML = '';
    MakingFilter();

})

function applyFilter() {
    CanvasCtx.save();
    CanvasCtx.clearRect(0, 0, _Canvas.width, _Canvas.height);
    CanvasCtx.filter = `
    brightness(${filters.Brightness.value}${filters.Brightness.unit})
    contrast(${filters.Contrast.value}${filters.Contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.Hue_Rotate.value}${filters.Hue_Rotate.unit})
    blur(${filters.Blur.value}${filters.Blur.unit})
    grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
    invert(${filters.Invert.value}${filters.Invert.unit})
    opacity(${filters.Opacity.value}${filters.Opacity.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    `
    CanvasCtx.drawImage(image, 0, 0, _Canvas.width, _Canvas.height);
    CanvasCtx.restore();
}

ResetButton.addEventListener('click', () => {
    if (!image || !isEditing) {
        alert('Choose an Image first!!!');
        return;
    }
    ResetFilter();
    applyFilter();
    document.querySelector('.filters').innerHTML = '';
    MakingFilter();
})
function PrepareCanvasForDownload(canvas, maxwidth = 1800) {
    if (canvas.width <= maxwidth) return canvas;

    let ratio = canvas.height / canvas.width;
    let c = document.createElement('canvas');

    c.width = maxwidth;
    c.height = ratio * maxwidth;

    c.getContext('2d').drawImage(canvas, 0, 0, c.width, c.height);

    return c;
}

function DownloadJPEGUnderLimit(canvas, fileName, maxSize = 2.5) {
    const Max_Size = maxSize * 1024 * 1024;
    let quality = 0.85;
    const min_quality = 0.45;

    function compress() {
        canvas.toBlob((bold) => {
            if (!bold) return

            if (bold.size <= Max_Size || quality <= min_quality) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(bold);
                link.download = fileName;
                link.click();
                return
            }

            quality -= 0.07;
            compress();
        }, "image/jpeg", quality);
    }

    compress();
}
DownloadButton.addEventListener('click', () => {
    if (!image || !isEditing) {
        alert('Choose an Image first!!!');
        return;
    }


    const exportCanvas = PrepareCanvasForDownload(_Canvas);

    const outputName = PhotoFileName
        ? PhotoFileName.replace(/\.\w+$/, '.jpg')
        : 'EditedImage.jpg';

    DownloadJPEGUnderLimit(exportCanvas, outputName, 2.5);
})


const presets = {
    Drama: {
        Brightness: 90,
        Contrast: 140,
        saturation: 130,
        Hue_Rotate: 0,
        Blur: 0,
        Grayscale: 0,
        sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    OldSchool: {
        Brightness: 105,
        Contrast: 110,
        saturation: 70,
        Hue_Rotate: 0,
        Blur: 1,
        Grayscale: 10,
        sepia: 45,
        Opacity: 100,
        Invert: 0
    },

    Vintage: {
        Brightness: 110,
        Contrast: 90,
        saturation: 80,
        Hue_Rotate: 0,
        Blur: 0,
        Grayscale: 0,
        sepia: 35,
        Opacity: 100,
        Invert: 0
    },

    Cinematic: {
        Brightness: 95,
        Contrast: 125,
        saturation: 110,
        Hue_Rotate: 350,
        Blur: 0,
        Grayscale: 0,
        sepia: 10,
        Opacity: 100,
        Invert: 0
    },

    Matte: {
        Brightness: 105,
        Contrast: 80,
        saturation: 90,
        Hue_Rotate: 0,
        Blur: 0,
        Grayscale: 0,
        sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    BlackAndWhite: {
        Brightness: 100,
        Contrast: 120,
        saturation: 0,
        Hue_Rotate: 0,
        Blur: 0,
        Grayscale: 100,
        sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    Warm: {
        Brightness: 105,
        Contrast: 105,
        saturation: 120,
        Hue_Rotate: 12,
        Blur: 0,
        Grayscale: 0,
        sepia: 15,
        Opacity: 100,
        Invert: 0
    },

    Cool: {
        Brightness: 95,
        Contrast: 110,
        saturation: 110,
        Hue_Rotate: 345,
        Blur: 0,
        Grayscale: 0,
        sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    SoftFade: {
        Brightness: 108,
        Contrast: 85,
        saturation: 90,
        Hue_Rotate: 0,
        Blur: 1,
        Grayscale: 0,
        sepia: 10,
        Opacity: 100,
        Invert: 0
    },

    HighContrastBW: {
        Brightness: 95,
        Contrast: 150,
        saturation: 0,
        Hue_Rotate: 0,
        Blur: 0,
        Grayscale: 100,
        sepia: 0,
        Opacity: 100,
        Invert: 0
    }
};
for (const Preset in presets) {
    const presetButton = document.createElement('button');
    presetButton.classList.add('btn');
    presetButton.innerText = Preset;
    PresetContainer.appendChild(presetButton);

    presetButton.addEventListener('click', () => {
        if (!image || !isEditing) {
            alert('Choose an image first!');
            return;
        }

        const _preset = presets[Preset];
        for (const keys in _preset) {
            filters[keys].value = _preset[keys];
        }
        applyFilter();
        Filters.innerHTML = '';
        MakingFilter();
    })
}

function CloseEdit() {
    document.querySelector('.ImagePlaceHolder').style.display = 'flex';
    document.querySelector('#canvas').style.display = 'none';
    CanvasCtx.clearRect(0, 0, _Canvas.width, _Canvas.height);
    chooseInput.value = '';
    CanvasCtx.filter = 'none';
    file = null;
    image = null;
    PhotoName = null;
}

document.querySelector('#cut').addEventListener('click', () => {
    if (!image || !isEditing) {
        alert('Choose an Image first!!!');
        return;
    }
    let Confirm = confirm(`If you sure to close the edit of "${PhotoFileName}", then click on ok!! `);
    if (!Confirm) {
        return
    }
    ResetFilter();
    CloseEdit();
    document.querySelector('.filters').innerHTML = '';
    MakingFilter();
});
