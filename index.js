const pkv = require('parse-key-value');

const cleanArgs = {
    'author': {
        'newline': false,
        'whitespace': true
    },
    'authorPath': {
        'newline': false,
        'whitespace': false
    },
    'authorUrl': {
        'newline': false,
        'whitespace': false
    },
    'claim': {
        'newline': false,
        'whitespace': false
    },
    'embedUrl': {
        'newline': false,
        'whitespace': false
    },
    'height': {
        'newline': false,
        'whitespace': false
    },
    'series': {
        'newline': false,
        'whitespace': true
    },
    'seriesDescription': {
        'newline': false,
        'whitespace': true
    },
    'seriesPath': {
        'newline': false,
        'whitespace': false
    },
    'seriesUrl': {
        'newline': false,
        'whitespace': false
    },
    'target': {
        'newline': false,
        'whitespace': false
    },
    'video': {
        'newline': false,
        'whitespace': true
    },
    'videoPath': {
        'newline': false,
        'whitespace': false
    },
    'videoUrl': {
        'newline': false,
        'whitespace': false
    },
    'width': {
        'newline': false,
        'whitespace': false
    }
};

const embedLinkedInLearning = (args) => {
    args = args || [];
    args = preprocessArguments(args);
    args = processArguments(args);
    if (!validateArgs(args)) return;
    args = enrichArguments(args);

    let linkedInEmbed = '';
    linkedInEmbed += generateIframe(args);
    linkedInEmbed += generateCredits(args);

    return linkedInEmbed;
};

const cleanValue = (value, settings) => {
    if (!settings.newline)
    {
        value = value.replace(/\r?\n|\r/g, '');
    }
    if (!settings.whitespace)
    {
        value = value.replace(/\s/g, '');
    }
    else
    {
        value = value.replace(/\s+/g, ' ');
    }

    return value;
};

const videoCredit = (args) => {
    let videoCredits = '';
    if (typeof args.videoUrl !== 'undefined' && typeof args.video !== 'undefined')
    {
        videoCredits += '<strong>';
        videoCredits += '<a href="' + args.videoUrl + '" title="' + args.video + '"' + args.target + '>' + args.video + '</a>';
        videoCredits += '</strong>';
    }

    return videoCredits;
};

const seriesCredit = (args) => {
    let seriesCredits = '';
    if (typeof args.series !== 'undefined' && typeof args.seriesDescription !== 'undefined' && typeof args.seriesUrl !== 'undefined')
    {
        seriesCredits += ' from ';
        seriesCredits += '<strong>';
        seriesCredits += '<a href="' + args.seriesUrl + '" title="' + args.seriesDescription + '"' + args.target + '>' + args.series + '</a>';
        seriesCredits += '</strong>';
    }

    return seriesCredits;
};

const authorCredit = (args) => {
    let authorCredits = '';
    if (typeof args.author !== 'undefined' && typeof args.authorUrl !== 'undefined')
    {
        authorCredits += ' by ';
        authorCredits += '<strong>';
        authorCredits += '<a href="' + args.authorUrl + '"' + args.target + '>' + args.author + '</a>';
        authorCredits += '</strong>';
    }

    return authorCredits;
};

const generateCredits = (args) => {
    let credits = '';
    credits += '<p>';
    credits += videoCredit(args);
    credits += seriesCredit(args);
    credits += authorCredit(args);
    credits += '</p>';
    credits += '<p class="text-muted"><em>';
    credits += 'FireFox\'s Enhanced Tracking Protection will prevent LinkedIn Learning videos from displaying inline. ';
    credits += 'You may need to disable this feature for this site to view the video.';
    credits += '</em></p>';

    return credits;
};

const generateIframe = (args) => {
    let iFrame = '';
    iFrame += '<div style="position:relative;height:0;padding-bottom:56.25%">';
    iFrame += '<iframe width="' + args.width + '" height="' + args.height + '" src="' + args.embedUrl + '" mozallowfullscreen="true" webkitallowfullscreen="true" allowfullscreen="true" frameborder="0" style="position:absolute;width:100%;height:100%;left:0"></iframe>';
    iFrame += '</div>';

    return iFrame;
};

const enrichArguments = (args) => {
    args.videoPath = convertToPath(args.video);
    args.seriesPath = convertToPath(args.series);
    if (typeof args.authorPath === 'string')
    {
        args.authorPath = '/' + args.authorPath;
    }
    else if (typeof args.author !== 'undefined')
    {
        args.authorPath = convertToPath(args.author);
    }

    if (typeof args.target === 'undefined')
    {
        args.target = '';
    }
    else
    {
        args.target = ' target="' + args.target + '"';
    }

    args.embedUrl = 'https://www.linkedin.com/learning/embed' + args.seriesPath + args.videoPath + '?claim=' + args.claim;
    args.videoUrl = 'https://www.linkedin.com/learning' + args.seriesPath + args.videoPath + '?trk=embed_lil';
    if (args.seriesPath !== '')
    {
        args.seriesUrl = 'https://www.linkedin.com/learning' + args.seriesPath + '?trk=embed_lil';
    }
    if (typeof args.authorPath !== 'undefined')
    {
        args.authorUrl = 'https://www.linkedin.com/learning/instructors' + args.authorPath + '?trk=embed_lil';
    }
    if (typeof args.seriesDescription === 'undefined' && typeof args.series !== 'undefined')
    {
        args.seriesDescription = args.series;
    }

    args.width = args.width || 320;
    args.height = args.height || 240;

    return args;
};

const convertToPath = (title) => {
    if (typeof title === 'undefined')
    {
        return '';
    }
    return '/' + title.toLowerCase().replace(/[^a-z0-9]/gmi, " ").replace(/\s+/g, "-");
};

const validateArgs = (args) => {
    return typeof args.video !== 'undefined' && typeof args.claim !== 'undefined';
};

const parseArguments = (value) => {
    return pkv(value);
};

const reduceArguments = (args, result) => {
    args.forEach(
        function (item) {
            let keys = Object.keys(item);
            keys.forEach(
                function (key)
                {
                    if (typeof result[key] !== 'undefined')
                    {
                        if (typeof result[key] === 'object' && Array.isArray(result[key]))
                        {
                            result[key].push(item[key]);
                        }
                        else
                        {
                            result[key] = [
                                result[key],
                                item[key]
                            ];
                        }
                    }
                    else
                    {
                        result[key] = item[key];
                    }
                }
            );
        }
    );
};

const processArguments = (args) => {
    args = args.map(parseArguments);
    let result = {};
    reduceArguments(args, result);

    return result;
};

const preprocessArguments = (args) => {
    let preprocessed = [];
    args.forEach(
        (arg) => {
            let parts = arg.split('=');
            parts[1] = cleanValue(parts[1], cleanArgs[parts[0]]);
            preprocessed.push(parts[0] + '=' + parts[1]);
        }
    );

    return preprocessed;
};

hexo.extend.tag.register(
    'linkedinlearning',
    embedLinkedInLearning
);
