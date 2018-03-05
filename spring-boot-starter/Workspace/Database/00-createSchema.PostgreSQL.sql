
-- set environment
set HOST="127.0.0.1"
--set HOST="localhost"
set PORT="5432"

set PG_HOME=C:\Program Files\PostgreSQL\9.3
set PATH=C:\Program Files\PostgreSQL\9.3\bin

set SCRIPT_PATH="D:\User\ashraful.islam\Projects\celloscopebanking\Workspace\Database\csbPlatform\PostgreSQL"

cd C:\Program Files\PostgreSQL\9.3\bin

-- login as postgres user
psql.exe -h %HOST% -p %PORT% -d postgres -U postgres


-- run this within psql to create celloscope user, csbPlatform database
create user celloscope password 'secl2013';
create database cityagent WITH owner=celloscope encoding='UTF8';
ALTER USER celloscope WITH SUPERUSER;

-- run the scripts
\o :scriptPath/output.log
\i :scriptPath/01-createObject.PostgreSQL.sql
\i :scriptPath/05-createMasterData.PostgreSQL.sql
\q
