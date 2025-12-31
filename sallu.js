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
        uint: "%"
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
let PhotoName=null;


function CreateFilter(name, uint = '%', value, max, min) {
    const div = document.createElement('div')
    div.classList.add('filter');

    let InputElement = document.createElement('input');
    InputElement.type = 'range';
    InputElement.name = name;
    InputElement.value = value;
    InputElement.max = max;
    InputElement.min = min;

    InputElement.addEventListener('input', (E) => {
        filters[name].value = InputElement.value;
        applyFilter();
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
    document.querySelector('.ImagePlaceHolder').style.display = 'none';
    document.querySelector('#canvas').style.display = 'block';
    file = (e.target.files[0]);
    PhotoName=(e.target.files[0].name);
    let img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        _Canvas.width = img.width;
        _Canvas.height = img.height;
        CanvasCtx.drawImage(img, 0, 0,);
    }

})

function applyFilter() {
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
    `
    CanvasCtx.drawImage(image, 0, 0)
}

ResetButton.addEventListener('click', () => {
     if(chooseInput.value ===''){
        alert('Choose an Image first!!!');
        return;
    }
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
            uint: "%"
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
    applyFilter();
    document.querySelector('.filters').innerHTML = '';
    MakingFilter();
})

DownloadButton.addEventListener('click', () => {
     if(chooseInput.value ===''){
        alert('Choose an Image first!!!');
        return;
    }
    const Download = document.createElement('a');
    Download.download = 'EditedImage.png';
    Download.href = _Canvas.toDataURL();
    Download.click()
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
        const _preset = presets[Preset];
        console.log(_preset);
        for (const keys in _preset) {
            filters[keys].value = _preset[keys]
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
    file = null;
    image = null;
    PhotoName=null;
}

document.querySelector('#cut').addEventListener('click', () => {
    if(chooseInput.value ===''){
        alert('Choose an Image first!!!');
        return;
    }
    let Confirm = confirm(`If you sure to close the edit of "${PhotoName}", then click on ok!! `);
    if (!Confirm) {
        return
    }
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
            uint: "%"
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
    CloseEdit();
    document.querySelector('.filters').innerHTML = '';
    MakingFilter();
});