### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'publisher.sh' fornecido 
## pela Trybe. 

[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
    --path .trybe \
    --path .github \
    --path trybe.yml \
    --path trybe-filter-repo.sh \
    --path tests/*.py \
    --path tests/ingredient/conftest.py \
    --path tests/ingredient/mocks.py \
    --path tests/dish/conftest.py \
    --path tests/dish/mocks.py \
    --path tests/mocks \
    --path README.md \
    --invert-paths --force
