# Static Data Files

This directory contains static data files used for application initialization and testing.

## Files

- `initial-data.json`: Initial data for the portfolio application. Used to populate the local database when no existing data is found.

## Usage

These files are loaded by the `PortfolioService` during application initialization. They should be considered as fallback data and not relied upon for production use.

## Updating

When updating these files:
1. Ensure the data structure matches the TypeScript interfaces in `src/app/data-access/models`
2. Validate the JSON format
3. Update any related tests that might depend on this data