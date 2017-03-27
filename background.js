// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function () {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
              // That fires when a page's URL contains...
              conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        //urlContains: "//www.imdb.com/",
                        urlMatches: '\/\/www\.imdb.com\/.+\/tt\\d{7}\/'
                    },
                })
              ],
              // And shows the extension's page action.
              actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.match(/\/\/www\.imdb.com\/.+\/tt\d{7}\//)) {
        chrome.pageAction.show(tabId);
    } else {
        chrome.pageAction.hide(tabId);
    }
});
