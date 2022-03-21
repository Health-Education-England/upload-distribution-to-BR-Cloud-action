# Upload distribution to Bloomreach(BR) Cloud action
This action uploads a distribution to BR Cloud and outputs the distribution id. 
The action is using the BR Cloud Rest API. The API documentation is available at `https://api-<stack-name>.onehippo.io/v3/docs`. 
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

### `distId`

Id of the uploaded distribution

## Example usage

```
uses: Health-Education-England/upload-distribution-to-BR-Cloud-action@v1.0
with:
  brcStack: "brStackName"
  username: ${{ secrets.BRC_USERNAME }}
  password: ${{ secrets.BRC_PASSWORD }}
  distPath: "${{ github.workspace }}/target/distribution.tar.gz"
```
