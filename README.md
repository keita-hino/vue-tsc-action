# vue-tsc-action

This Github action runs [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc) against `.vue` files and display the errors found in whole codebase.

# preparation
1. Include [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc) in package.json
2. Add tsconfig.json

# Usage
Add to your existing workflow file or create a new file named `.github/workflows/check_vue_tsc.yml` and copy over one of the examples below to your new workflow file.

This is the simplest example to get it running:

```yml
name: check-vue-tsc
on: push

jobs:
  vue-tsc:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - uses: keita-hino/vue-tsc-action@main
```

If there is an error, the error details will be displayed in the workflow execution log.

<img width="973" alt="スクリーンショット 2021-09-04 13 59 26" src="https://user-images.githubusercontent.com/15973671/132083079-7618ddaf-6eb9-4e57-8981-c00a3d5ad82a.png">

# License
All scripts in this project are released under the MIT License.
