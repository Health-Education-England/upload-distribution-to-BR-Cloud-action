# Upload distribution to Bloomreach(BR) Cloud action
This action uploads a distribution to BR Cloud and outputs the distribution id. 

## Inputs

### `brcStack`

**Required** BR Cloud stack name.

### `username`

**Required** BR Cloud username.

### `password`

**Required** BR Cloud password.

### `distPath`

**Required** The name and path of the file distribution.

## Outputs

### `distributionId`

Id of the uploaded distribution

## Example usage

```
uses: adrianamiclos/upload-distribution-to-BRCloud-action@v1.0
with:
  brcStack: "brStackName"
  username: ${{ secrets.BRC_USERNAME }}
  password: ${{ secrets.BRC_PASSWORD }}
  distPath: "${{ github.workspace }}/target/distribution.tar.gz"
```