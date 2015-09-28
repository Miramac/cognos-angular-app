'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function TransformService() {
    var transform = {};
    
    
    //transform report items
    transform.report = function (result) {
        var report,
            node,
            i;
        if (result.filterResultSet && result.filterResultSet.filterResult[0] && result.filterResultSet.filterResult[0].reportElement) {
            node = result.filterResultSet.filterResult[0].reportElement;
        }
        for (i = 0; i < node.length; i++) {
            //** listtable
            if (node[i].lst) {
                report = transform.list(node[i].lst);
            }
        }

        return report;
    };
    
    //transform listtable
    transform.list = function (node) {
        var rows = [],
            i;
        if (node.colTitle && node.colTitle.length > 0) {
            rows.push({
                rowType: 'header',
                data: transform.row(node.colTitle)
            })
        }
        //for data rows
        if (node.group && node.group.row && node.group.row.length > 0) {
            for (i = 0; i < node.group.row.length; i++) {
                rows.push({
                    rowType: 'body',
                    data: transform.row(node.group.row[i].cell)
                });
            }
        }

        return rows;
    };
    
    //transform a rowcells array
    transform.row = function (node) {

        var items = [],
            i;
        for (i = 0; i < node.length; i++) {
            items.push(transform.item(node[i].item));
        }

        return items;
    };
    
    //transform the item array
    transform.item = function (node) {
        var items = [],
            i;
        for (i = 0; i < node.length; i++) {
            //for nested lists
            if (node[i].lst) {
                items.push(transform.list(node[i].lst));
            }
            //for text nodes
            else if (node[i].txt) {
                items.push({
                    val: node[i].txt.val,
                    fmtVal: node[i].txt.fmtVal,
                    valTyp: node[i].txt.valTyp,
                    fmtPatrn: (node[i].txt.fmtPatrn) ? node[i].txt.fmtPatrn : null
                });
            }
        }

        return items;
    };

    return transform;
}


servicesModule.factory('TransformService', TransformService);
