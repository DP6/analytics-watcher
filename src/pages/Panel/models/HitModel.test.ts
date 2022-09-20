// USO:
// $ npx tsx HitModel.test.ts
//

import { HitModel, HitInterface, HitInternalInterface, URLInternalInterface } from './HitModel';
import _ from 'lodash';


// --------------------------------------------
// Test function
// --------------------------------------------
let passedTests = 0;
let failedTests = 0;
function test(desc: string, output: any, expected: any) {
    if (_.isEqual(output, expected)) {
        console.log('✅ \x1b[32m%s\x1b[0m', 'Passed', desc);
        passedTests = passedTests + 1;
    } else {
        console.log('❌ \x1b[31m%s\x1b[0m', 'Failed', desc);
        console.log('    output:', output);
        console.log('    expected:', expected);
        failedTests = failedTests + 1;
    }
}


// --------------------------------------------
// Mock data
// --------------------------------------------
let mockData: Array<HitInterface> = [
    {
        url: 'www.globo.com',
        hitParameters: { a: 'aaa', b: 'bbb', c: '14' },
        validationStatus: 'SUCCESS',
        validationResult: [],
        contentTitle: 'Hit nº 1',
        hitType: 'pageview',
        expanded: false,
        favIconUrl: '',
    },
    {
        url: 'www.globo.com/globoesporte',
        hitParameters: { a: 'aaa', d: 'ddddd' },
        validationStatus: 'SUCCESS',
        validationResult: [],
        contentTitle: 'Hit nº 2',
        hitType: 'pageview',
        expanded: false,
        favIconUrl: '',
    },
    {
        url: 'www.globo.com/globoesporte',
        hitParameters: { a: 'aaa', b: 'bbb', d: 'dfdfdfdf' },
        validationStatus: 'ERROR',
        validationResult: [],
        contentTitle: 'Hit nº 3',
        hitType: 'event',
        expanded: false,
        favIconUrl: '',
    },
    {
        url: 'www.globo.com/globoesporte/flamengo',
        hitParameters: { g: 'gggggggg' },
        validationStatus: 'SUCCESS',
        validationResult: [],
        contentTitle: 'Hit nº 4',
        hitType: 'event',
        expanded: false,
        favIconUrl: '',
    },
];


// --------------------------------------------
// Expected internal mock data
// --------------------------------------------
// dataMap
let mockInternalDataMap = new Map(
    [
        [0, {
            urlKey: 0,
            hitKey: 0,
            url: 'www.globo.com',
            hitParameters: { a: 'aaa', b: 'bbb', c: '14' },
            validationStatus: 'SUCCESS',
            validationResult: [],
            contentTitle: 'Hit nº 1',
            hitType: 'pageview',
            expanded: false,
            favIconUrl: '',
        }],
        [1, {
            urlKey: 1,
            hitKey: 1,
            url: 'www.globo.com/globoesporte',
            hitParameters: { a: 'aaa', d: 'ddddd' },
            validationStatus: 'SUCCESS',
            validationResult: [],
            contentTitle: 'Hit nº 2',
            hitType: 'pageview',
            expanded: false,
            favIconUrl: '',
        }],
        [2, {
            urlKey: 1,
            hitKey: 2,
            url: 'www.globo.com/globoesporte',
            hitParameters: { a: 'aaa', b: 'bbb', d: 'dfdfdfdf' },
            validationStatus: 'ERROR',
            validationResult: [],
            contentTitle: 'Hit nº 3',
            hitType: 'event',
            expanded: false,
            favIconUrl: '',
        }],
        [3, {
            urlKey: 2,
            hitKey: 3,
            url: 'www.globo.com/globoesporte/flamengo',
            hitParameters: { g: 'gggggggg' },
            validationStatus: 'SUCCESS',
            validationResult: [],
            contentTitle: 'Hit nº 4',
            hitType: 'event',
            expanded: false,
            favIconUrl: '',
        }],
    ]
);

// urlMap
let mockInternalUrlMap = new Map(
    [
        [0, {
            urlKey: 0,
            url: 'www.globo.com',
            expanded: true,
            favIconUrl: '',
        }],
        [1, {
            urlKey: 1,
            url: 'www.globo.com/globoesporte',
            expanded: true,
            favIconUrl: '',
        }],
        [2, {
            urlKey: 2,
            url: 'www.globo.com/globoesporte/flamengo',
            expanded: true,
            favIconUrl: '',
        }],
    ]
);


// --------------------------------------------
// Setup function
// --------------------------------------------
function setUpData() {
    let data = new HitModel();

    // Add data
    mockData.forEach((value, index) => {
        data.addData(value);
    });

    return data;
}


// --------------------------------------------
// TESTS
// --------------------------------------------

let data: HitModel;
let output: any;
let expected: any;


// -----------------------------------
// addData
// -----------------------------------
data = setUpData();
output = data.dataMap.size;
expected = 4;
test('addData 0', output, expected);


data = setUpData();
output = data.dataMap;
expected = mockInternalDataMap;
test('addData 1', output, expected);


data = setUpData();
output = data.urlMap.size;
expected = 3;
test('addData 2', output, expected);


data = setUpData();
output = data.urlMap;
expected = mockInternalUrlMap;
test('addData 3', output, expected);


// -----------------------------------
// getMaxUrlKey
// -----------------------------------
data = setUpData();
output = data.getMaxUrlKey();
expected = 2;
test('getMaxUrlKey 0', output, expected);


// -----------------------------------
// getMaxDataKey
// -----------------------------------
data = setUpData();
output = data.getMaxDataKey();
expected = 3;
test('getMaxDataKey 0', output, expected);


// -----------------------------------
// getData
// -----------------------------------
data = setUpData();
output = data.getHit(2);
expected = mockInternalDataMap.get(2);
test('getData 0', output, expected);


// -----------------------------------
// getDataByUrl
// -----------------------------------
data = setUpData();
output = data.getDataByUrl(1);
expected = new Map([...mockInternalDataMap].slice(1, 3));
test('getDataByUrl 0', output, expected);


// -----------------------------------
// getUniqueUrlKeys
// -----------------------------------
data = setUpData();
output = data.getUniqueUrlKeys();
expected = [0, 1, 2];
test('getUniqueUrlKeys 0', output, expected);


// -----------------------------------
// toggleUrlExpanded
// -----------------------------------
data = setUpData();
data.toggleUrlExpanded(2);
output = data.urlMap.get(2)?.expanded;
expected = !mockInternalUrlMap.get(2)?.expanded;
test('toggleUrlExpanded 0', output, expected);


// -----------------------------------
// toggleDataExpanded
// -----------------------------------
data = setUpData();
data.toggleDataExpanded(2);
output = data.getHit(2)?.expanded;
expected = !mockInternalDataMap.get(2)?.expanded;
test('toggleDataExpanded 0', output, expected);


// -----------------------------------
// expandAll
// -----------------------------------
// ture -------------------
// dataMap
data = setUpData();
data.expandAll(true);
output = [...data.dataMap].every(([key, value]) => value.expanded === true);
expected = true;
test('expandAll 0', output, expected);

// urlMap
data = setUpData();
data.expandAll(true);
output = [...data.urlMap].every(([key, value]) => value.expanded === true);
expected = true;
test('expandAll 1', output, expected);


// false -------------------
// dataMap
data = setUpData();
data.expandAll(false);
output = [...data.dataMap].every(([key, value]) => value.expanded === false);
expected = true;
test('expandAll 2', output, expected);

// urlMap
data = setUpData();
data.expandAll(false);
output = [...data.urlMap].every(([key, value]) => value.expanded === false);
expected = true;
test('expandAll 3', output, expected);


// -----------------------------------
// removeData
// -----------------------------------
data = setUpData();
data.removeData(2);
output = data.dataMap;
expected = new Map(mockInternalDataMap);
expected.delete(2);
test('removeData 0', output, expected);


data = setUpData();
data.removeData();
output = data.dataMap;
expected = new Map();
test('removeData 1', output, expected);


// -----------------------------------
// removeUrl
// -----------------------------------
data = setUpData();
data.removeUrl(1);
output = data.urlMap;
expected = new Map(mockInternalUrlMap);
expected.delete(1);
test('removeUrl 0', output, expected);


data = setUpData();
data.removeUrl(1);
output = data.dataMap;
expected = new Map(mockInternalDataMap);
expected.delete(1);
expected.delete(2);
test('removeUrl 1', output, expected);


// -----------------------------------
// getValidationIndicators
// -----------------------------------
data = setUpData();
output = data.getValidationIndicators();
expected = 4;
test('getValidationIndicators 0', output, expected);

data = setUpData();
output = data.getValidationIndicators('SUCCESS');
expected = 3;
test('getValidationIndicators 1', output, expected);

data = setUpData();
output = data.getValidationIndicators('ERROR');
expected = 1;
test('getValidationIndicators 2', output, expected);

data = setUpData();
output = data.getValidationIndicators('WARNING');
expected = 0;
test('getValidationIndicators 3', output, expected);


// -----------------------------------
// reverse
// -----------------------------------
data = setUpData();
output = data.reverse().dataMap;
expected = new Map([...mockInternalDataMap].reverse());
test('reverse 0', output, expected);


// -----------------------------------
// filterByType
// -----------------------------------
let filterTypesArray: Array<string>;

// ['pageview'] ...............................
data = setUpData();
filterTypesArray = ['pageview'];
output = data.filterByType(filterTypesArray).dataMap;
expected = new Map([...mockInternalDataMap].filter(([key, value]) => filterTypesArray.includes(value.hitType)));
test('filterByType 0', output, expected);

// ['pageview','another'] ...............................
data = setUpData();
filterTypesArray = ['pageview', 'another'];
output = data.filterByType(filterTypesArray).dataMap;
expected = new Map([...mockInternalDataMap].filter(([key, value]) => filterTypesArray.includes(value.hitType)));
test('filterByType 1', output, expected);


// ['another'] ...............................
data = setUpData();
filterTypesArray = ['another'];
output = data.filterByType(filterTypesArray).dataMap;
expected = new Map([...mockInternalDataMap].filter(([key, value]) => filterTypesArray.includes(value.hitType)));
test('filterByType 2', output, expected);


// -----------------------------------
// filterBySearchText
// -----------------------------------
let searchedText: string;

// bb ...............................
data = setUpData();
searchedText = 'bb';
output = data.filterBySearchText(searchedText).dataMap;
expected = new Map([...mockInternalDataMap].filter(([key, value]) => Object.values(value.hitParameters).some((val: any) => val.toLowerCase().includes(searchedText.toLowerCase()))));
test('filterBySearchText 0', output, expected);


// bbgggggg ...............................
data = setUpData();
searchedText = 'bbgggggg';
output = data.filterBySearchText(searchedText).dataMap;
expected = new Map([...mockInternalDataMap].filter(([key, value]) => Object.values(value.hitParameters).some((val: any) => val.toLowerCase().includes(searchedText.toLowerCase()))));
test('filterBySearchText 1', output, expected);


// -----------------------------------
// filterByStatus
// -----------------------------------
let filterStatus: Array<string>;

// SUCCESS ...............................
data = setUpData();
filterStatus = ['SUCCESS'];
output = data.filterByStatus(filterStatus).dataMap;
expected = new Map([...mockInternalDataMap].filter(([key, value]) => filterStatus.includes(value.validationStatus)));
test('filterByStatus 0', output, expected);


// ERROR ...............................
data = setUpData();
filterStatus = ['SUCCESS'];
output = data.filterByStatus(filterStatus).dataMap;
expected = new Map([...mockInternalDataMap].filter(([key, value]) => filterStatus.includes(value.validationStatus)));
test('filterByStatus 1', output, expected);


// WARNING ...............................
data = setUpData();
filterStatus = ['SUCCESS'];
output = data.filterByStatus(filterStatus).dataMap;
expected = new Map([...mockInternalDataMap].filter(([key, value]) => filterStatus.includes(value.validationStatus)));
test('filterByStatus 2', output, expected);


// 'SUCCESS', 'WARNING' ...............................
data = setUpData();
filterStatus = ['SUCCESS', 'WARNING'];
output = data.filterByStatus(filterStatus).dataMap;
expected = new Map([...mockInternalDataMap].filter(([key, value]) => filterStatus.includes(value.validationStatus)));
test('filterByStatus 3', output, expected);


// -----------------------------------
// filterByPage
// -----------------------------------
let pagination: { currentPage: number, pageSize: number };

// currentPage: 1, pageSize: 2 ...............................
data = setUpData();
pagination = { currentPage: 1, pageSize: 2 };
output = data.filterByPage(pagination).dataMap;
expected = new Map([...mockInternalDataMap].slice(0, 2));
test('filterByPage 0', output, expected);


// currentPage: 3, pageSize: 1 ...............................
data = setUpData();
pagination = { currentPage: 3, pageSize: 1 };
output = data.filterByPage(pagination).dataMap;
expected = new Map([...mockInternalDataMap].slice(2, 3));
test('filterByPage 1', output, expected);


// currentPage: 1, pageSize: 100 ...............................
data = setUpData();
pagination = { currentPage: 1, pageSize: 100 };
output = data.filterByPage(pagination).dataMap;
expected = new Map([...mockInternalDataMap].slice(0, 100));
test('filterByPage 2', output, expected);


// -----------------------------------
// filteredData
// -----------------------------------
data = setUpData();

filterTypesArray = ['pageview'];
searchedText = 'bb';
filterStatus = ['SUCCESS'];
pagination = { currentPage: 1, pageSize: 2 };

output = data.filteredData(filterTypesArray, searchedText, filterStatus, pagination).dataMap;
expected = (
    new Map([...mockInternalDataMap]
        .filter(([key, value]) => filterTypesArray.includes(value.hitType))
        .filter(([key, value]) => Object.values(value.hitParameters).some((val: any) => val.toLowerCase().includes(searchedText.toLowerCase())))
        .filter(([key, value]) => filterStatus.includes(value.validationStatus))
        .slice(0, pagination.pageSize)
    )
);
test('filteredData 0', output, expected);


// --------------------------------------------
// SUMMARY
// --------------------------------------------
console.log();
console.log('--------------------------------------------');
console.log();
console.log('Total tests:', passedTests + failedTests);
console.log('✅ \x1b[32m%s\x1b[0m', 'Passed:', passedTests);
console.log('❌ \x1b[31m%s\x1b[0m', 'Failed', failedTests);