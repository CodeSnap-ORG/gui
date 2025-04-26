import {APP_NAME} from '../brand';

// Because there are all brand names, it is unnecessary for them to be translatable.
export default [
    {tag: 'scratch', intlLabel: 'Scratch'},
    {tag: 'tw', intlLabel: "TurboWarp"},
    {tag: 'ampmod', intlLabel: APP_NAME},
    // Categorize extensions by type.
    // For now leave untranslated
    {tag: 'internet', intlLabel: 'Internet'},
    {tag: 'graphics', intlLabel: 'Graphics'},
    {tag: 'sound', intlLabel: 'Sound'},
    {tag: 'math', intlLabel: 'Math'},
    {tag: 'hardware', intlLabel: 'Hardware'},
    {tag: 'data', intlLabel: 'Data Management'},
    {tag: 'catexp', intlLabel: 'Category Expansions'}
];
