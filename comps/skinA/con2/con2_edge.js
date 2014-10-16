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
                id: 'Text',
                type: 'text',
                rect: ['9px', '20px','auto','auto','auto', 'auto'],
                text: ":: Edge Contents 2",
                font: ['Arial, Helvetica, sans-serif', [24, ""], "rgba(0,0,0,1)", "normal", "none", ""]
            },
            {
                id: 'RoundRect',
                type: 'rect',
                rect: ['81px', '91px','202px','199px','auto', 'auto'],
                borderRadius: ["10px", "10px", "10px", "10px"],
                fill: ["rgba(90,62,136,1.00)"],
                stroke: [0,"rgba(0,0,0,1)","none"]
            },
            {
                id: 'nfccard',
                type: 'image',
                rect: ['317px', '91px','37.5%','37.5%','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"nfccard.jpg",'0px','0px']
            }],
            symbolInstances: [

            ]
        },
    states: {
        "Base State": {
            "${_Stage}": [
                ["color", "background-color", 'rgba(75,136,206,1.00)'],
                ["style", "width", '600px'],
                ["style", "height", '400px'],
                ["style", "overflow", 'hidden']
            ],
            "${_nfccard}": [
                ["style", "height", '37.5%'],
                ["style", "top", '91px'],
                ["style", "left", '317px'],
                ["style", "width", '37.5%']
            ],
            "${_Text}": [
                ["style", "left", '9px'],
                ["style", "top", '20px']
            ],
            "${_RoundRect}": [
                ["style", "left", '81px'],
                ["color", "background-color", 'rgba(90,62,136,1.00)']
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
})(jQuery, AdobeEdge, "EDGE-20535176");
