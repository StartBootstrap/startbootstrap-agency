@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\gzip-size\cli.js" %*
) ELSE (
  node  "%~dp0\..\gzip-size\cli.js" %*
)