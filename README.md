LongLang [![Build Status](https://travis-ci.org/maciejzasada/longlang.png?branch=develop)](https://travis-ci.org/maciejzasada/longlang)
========

Generates fake language (longer or shorter) from existing localisation file, preserving inline HTML.

--------

## Description
LongLang is designed to facilitate multi-national application and website testing by generating a fake localisation file that is longer (or shorter) than the source localisation (e.g. English).  
![English](https://raw.githubusercontent.com/maciejzasada/longlang/master/docs/images/source.png)

By generating the longer, fake language, you can easily see whether the layout adapts well or if it needs tweaks.  
![LongLang](https://raw.githubusercontent.com/maciejzasada/longlang/master/docs/images/longlang.png)

LongLang begins all copy with "S" after which "X"s follow, and appends "E" at the end so you can easily notice whether something is timmed / cropped or if the copy renders well.  
![issue](https://raw.githubusercontent.com/maciejzasada/longlang/master/docs/images/issue.png)

LongLang also preserves inline HTML so no tags, attributes or class names will be altered.

LongLang is compatible with AngularJS's ng-translate, i18next and many others.

## Installation
```
npm install -g longlang
```

## Usage
```
longlang inputFile [--scale=int]
```

#### inputFile (required)
path to the input JSON file with the original localisation.

#### scale (optional)
copy length multiplier. 1 = same length, 2 = twice as long, 0.5 = 50% shorter

#### output
Output will be saved to your current working directory as longlang.json.

Example:
```
longlang en-us.json
```
```
longlang fr.json --scale=2.5
```

## Examples

#### source.json
```json
{
    "one": "This is a test. A nice test.",
    "two": "Another example 3245345435. Awesome!!!",
    "html_test": "this is a <span class=\"green grass is cool\">test <div attribute=\"test\">(quite a long one)</div></span> and it goes to here."
}
```

```
longlang source.json --scale=2
```

#### longlang.json
```json
{
    "one": "SXXXXXXXXX XXXXX XXX XXXXXXXXXXX XXX XXXXXXXXX XXXXXXXXXXXE",
    "two": "SXXXXXXXXXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXE",
    "html_test": "SXXXXXXXXX XXXXX XXX X<span class=\"green grass is cool\">XXXXXXXXX X<div attribute=\"test\">XXXXXXXXXXXXX XXX XXXXXXXXX XXXXXXXXX</div>X</span>X XXXXXXX XXXXX XXXXXXXXX XXXXX XXXXXXXXXXXE"
}
```
