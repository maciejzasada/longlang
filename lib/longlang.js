var env = require('jsdom').env,
    $,
    WORD_DELIMITER = / /g;


function generateWord(length) {
    return new Array(Math.max(0, length)).join('X');
}


function replaceInEl($el, scale) {
    var html = $el.html(),
        children = $el.children(),
        words,
        newWords,
        parts = [html],
        partsTemp,
        tag,
        tags = [],
        i,
        j,
        result = '';

    if (children.length !== 0) {
        for (i = 0; i < children.length; ++i) {
            tag = $('<div></div>').append(children[i]).html();
            tags.push(tag);
            partsTemp = parts[i].split(tag);
            parts.splice(i);
            parts = parts.concat(partsTemp);
        }
    }

    for (i = 0; i < parts.length; ++i) {
        words = parts[i].split(WORD_DELIMITER);
        newWords = [];

        for (j = 0; j < words.length; ++j) {
            newWords.push(generateWord(Math.ceil((words[j].length + 1) * scale)));  // + 1 because of not counting spaces
        }

        result += newWords.join(' ');

        if (tags.length > i) {
            result += tags[i];
        }
    }

    $el.html(result);

    children = $el.children();

    for (i = 0; i < children.length; ++i) {
        replaceInEl($(children[i]), scale);
    }
}


function generateString(source, scale) {
    var str = 'S',
        $p = $('<p>' + source + '</p>');

    replaceInEl($p, scale);
    str += $p.html() + 'E';

    return str;
}


module.exports = function (inputPath, options, callback) {
    var lang = require(inputPath),
        scale = options.scale || 1.5,
        key,
        result = {};

    env('<html><body></body></html>', function (errors, window) {
        $ = require('jquery')(window);

        for (key in lang) {
            result[key] = generateString(lang[key], scale);
        }

        callback && callback(result);
    });
};
