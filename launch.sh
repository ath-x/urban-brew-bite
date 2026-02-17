#!/bin/bash
# Athena GUI Launcher (Root Wrapper)
# Deze script start het dashboard (GUI) van de Athena CMS Factory.

PROJECT_ROOT=$(dirname "$(readlink -f "$0")")
exec "$PROJECT_ROOT/factory/athena.sh"
