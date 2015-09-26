'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function TransformService() {
    var transform = {};
    
    //transform 
    
    //transform a cognos listtable 
    transform.table = function (node) {
        var table;
        if(node.lst){
            table = transform.rows(node.lst);
        }
        
        
        return table;
    };
    
    transform.rows = function(node) {
         console.log(node);
        var rows = [],
        i;
        for (i = 0; i < node.length; i++) {
            //for title rows
            if (node[i].colTitle && node[i].colTitle.length > 0) {
                rows.push({
                    rowType: 'header', 
                    data: transform.item(node[i].colTitle)
                })
            }
            //for data rows
            else if (node[i].group && node[i].group.row  && node[i].group.row.length > 0) {
               rows.push({
                    rowType: 'body', 
                    data: transform.item(node[i].group.row)
                }) 
            }
        }
        return rows; 
    };
    //row alias
    transform.row = transform.rows;
    
    transform.items = function (node) {
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
    //item alias
    transform.item = transform.items;
    
    return transform;
}


servicesModule.factory('TransformService', TransformService);
