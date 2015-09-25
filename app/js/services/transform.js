'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function TransformService() {
    var transform = {};
    
    //transform 
    
    //transform a cognos listtable 
    transform.listTable = function (data) {
        var rows = [],
            cells = [],
            items = [],
            row, cell, item,
            rowIndex, colIndex, itemIndex;
        
        //test if list has title row
        if (data.colTitle) {
            for (colIndex = 0; colIndex < data.colTitle.length; colIndex++) {
                items = [];
                cell = data.colTitle[colIndex];
                for (itemIndex = 0; itemIndex < cell.item.length; itemIndex++) {
                    item = cell.item[itemIndex]
                    items.push({
                        val: item.txt.val,
                        fmtVal: item.txt.fmtVal,
                        valTyp: item.txt.valTyp,
                        fmtPatrn: (item.txt.fmtPatrn) ? item.txt.fmtPatrn : null
                    });
                }
                cells.push(items);
            }
            rows.push({ type: 'header', data: cells });
        }
        //test if list has data
        if (data.group) {
            for (rowIndex = 0; rowIndex < data.group.row.length; rowIndex++) {
                cells = [];
                row =  data.group.row[rowIndex];
                for (colIndex = 0; colIndex < row.cell.length; colIndex++) {
                    items = [];
                    cell = row.cell[colIndex];
                    for (itemIndex = 0; itemIndex < cell.item.length; itemIndex++) {
                        item = cell.item[itemIndex]
                        items.push({
                            val: item.txt.val,
                            fmtVal: item.txt.fmtVal,
                            valTyp: item.txt.valTyp,
                            fmtPatrn: (item.txt.fmtPatrn) ? item.txt.fmtPatrn : null
                        });
                    }
                    cells.push(items);
                }
                // add data rows to table array
                rows.push({ type: 'body', data: cells });
            }
        }
        return rows;
    };
    
    return transform;
}


servicesModule.factory('TransformService', TransformService);
