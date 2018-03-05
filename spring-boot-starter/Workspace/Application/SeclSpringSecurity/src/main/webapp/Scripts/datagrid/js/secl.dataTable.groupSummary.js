/*
* File:        secl.groupSummary.js
* Version:     1.0.1.
* Author:      Kowsar Rahman 
*
* Copyright 2013 Kowsar Rahman, all rights reserved
* This source file is free software
* 
* Parameters:
* @colNo	  integer Array		column index number of those which will be summarize
* @colNum	  integer			number of column which a group have
* @nRow		  table Objects		objects of the table
*
* Usage (example) :
* addSummaryRow({
*					colNo	: [1,2],
*					colNum 	: 3 
*				}, 
*					nRow
*				);
*
*/
function addSummaryRow(params, nRow)
	{
		// option array
		var options = { 
			colNo: [0],  
			colNum : 1 
		};
	
		// Extending array from params
		$.extend(true, options, params);
		
		// Array for Group Name 
		var aGroupNameList = new Array();
		
		// Get all rows
		//var aTrs = oTable.fnGetNodes();
		var aTrs = getRows(nRow);
		
		// Find the group name and push in aGroupNameList
		for ( var i=0 ; i<aTrs.length ; i++ )
		{
			if($(aTrs[i]).attr('data-group') != undefined && $(aTrs[i]).attr('data-group') != false)
			{
				aGroupNameList.push('group-item-'+$(aTrs[i]).attr('data-group'));
			}
		}
		
		// loop for group summary
		for(var k = 0; k<aGroupNameList.length; k++)
		{
			var groupName = '.'+aGroupNameList[k]; // get the group class name
			var groupObj = $('tbody').find(groupName); // find the row which will be 
			
			var groupSummary = new Array(); // to put all sum up of columns
			var colCount = options["colNo"].length; // get the number of column which will be sum up
			
			// initialize the array with 0.0
			for(var l=0; l<colCount; l++)
			{
				groupSummary[l] = 0.0;
			}
			
			var counter = 0; // count the item number
			// loop for sum the group value
			$('tbody').find(groupName).each(function(index)
			{	
				// loop to sum every column in that group 
				for(var m = 0; m < colCount; m++)
				{
					groupSummary[m] += parseFloat($(this).find('td').eq(options["colNo"][m]).text().replace(/[^0-9\.-]/g,""));
				}
				counter ++;
			});
			
			var groupSummaryRow = $("<tr class='summarizedRow'/>"); //initialize a row
			
			groupSummaryRow.append($("<td style='font-weight: bold;'></td>")); // first Cell
			// append cell in the row
			for(var j = 1; j<options['colNum']; j++)
			{
				groupSummaryRow.append($("<td class='right' style='font-weight: bold;'></td>"));
			}
			
			// put the sum up value into the cell
			for(var j = 0; j<colCount; j++)
			{
				var formatedNumber = roundNumber(groupSummary[j], 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				groupSummaryRow.find("td").eq(options["colNo"][j]).text(formatedNumber);
			}
			
			groupSummaryRow.find("td").eq(0).text("Item : "+counter);
			// append the summary row
			groupObj.eq(groupObj.length-1).after($(groupSummaryRow));
		}
	}

// to format number
function roundNumber(number, decimals) { // Arguments: number to round, number of decimal places
	var r = '';
	var newnumber = new Number(number+'').toFixed(parseInt(decimals));
	r = parseFloat(newnumber); // Output the result to the form field (change for your purposes)
	
	return r;
}

// get all rows from table
function getRows ( nRow )
{
	var aNodes = [];
	var aoData = nRow.aoData;
	for ( var i=0, iLen=aoData.length ; i<iLen ; i++ )
	{
		if ( aoData[i].nTr !== null )
		{
			aNodes.push( aoData[i].nTr );
		}
	}
	return aNodes;
}