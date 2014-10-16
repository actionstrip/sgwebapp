/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};
var opts = {
    'gAudioPreloadPreference': 'auto',

    'gVideoPreloadPreference': 'auto'
};
var resources = [
];
var symbols = {
"stage": {
    version: "4.0.0",
    minimumCompatibleVersion: "4.0.0",
    build: "4.0.0.359",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
            {
                id: 'Rectangle',
                type: 'rect',
                rect: ['30px', '70px','170px','93px','auto', 'auto'],
                fill: ["rgba(80,166,125,1.00)"],
                stroke: [0,"rgba(0,0,0,1)","none"]
            },
            {
                id: 'baby_250',
                type: 'image',
                rect: ['433px', '76px','145px','209px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"baby_250.jpg",'0px','0px']
            },
            {
                id: 'RectangleCopy',
                type: 'rect',
                rect: ['230px', '70px','170px','93px','auto', 'auto'],
                fill: ["rgba(80,166,125,1.00)"],
                stroke: [0,"rgba(0,0,0,1)","none"]
            },
            {
                id: 'RectangleCopy2',
                type: 'rect',
                rect: ['30px', '192px','170px','93px','auto', 'auto'],
                fill: ["rgba(80,166,125,1.00)"],
                stroke: [0,"rgba(0,0,0,1)","none"]
            },
            {
                id: 'RectangleCopy3',
                type: 'rect',
                rect: ['230px', '192px','170px','93px','auto', 'auto'],
                fill: ["rgba(80,166,125,1.00)"],
                stroke: [0,"rgba(0,0,0,1)","none"]
            },
            {
                id: 'Text',
                type: 'text',
                rect: ['32px', '18','auto','auto','auto', 'auto'],
                text: ":: Edge Content",
                font: ['Arial, Helvetica, sans-serif', 24, "rgba(0,0,0,1)", "normal", "none", ""]
            }],
            symbolInstances: [

            ]
        },
    states: {
        "Base State": {
            "${_RectangleCopy3}": [
                ["color", "background-color", 'rgba(80,166,125,1)'],
                ["style", "left", '230px'],
                ["style", "top", '192px']
            ],
            "${_RectangleCopy}": [
                ["color", "background-color", 'rgba(80,166,125,1)'],
                ["style", "left", '230px'],
                ["style", "top", '70px']
            ],
            "${_RectangleCopy2}": [
                ["color", "background-color", 'rgba(80,166,125,1)'],
                ["style", "left", '30px'],
                ["style", "top", '192px']
            ],
            "${_Stage}": [
                ["color", "background-color", 'rgba(214,217,117,1.00)'],
                ["style", "overflow", 'hidden'],
                ["style", "height", '400px'],
                ["style", "width", '600px']
            ],
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(80,166,125,1.00)'],
                ["style", "top", '70px']
            ],
            "${_Text}": [
                ["style", "left", '32px']
            ],
            "${_baby_250}": [
                ["style", "height", '209px'],
                ["style", "top", '76px'],
                ["style", "left", '433px'],
                ["style", "width", '145px']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources, opts);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-19628313");
