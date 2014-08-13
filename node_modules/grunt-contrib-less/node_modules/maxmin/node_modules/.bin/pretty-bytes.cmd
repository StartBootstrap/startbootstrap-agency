@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\pretty-bytes\cli.js" %*
) ELSE (
  node  "%~dp0\..\pretty-bytes\cli.js" %*
)