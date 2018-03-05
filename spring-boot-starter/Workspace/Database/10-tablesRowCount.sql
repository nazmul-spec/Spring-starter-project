SELECT relname AS tableName, n_live_tup AS rowCount
FROM pg_stat_user_tables 
ORDER BY relname

--Billcollection
select count(*), 'Account' from account;
select count(*), 'Agent' from agent;
select count(*), 'AgentDepositeRequest' from agentdepositrequest;
select count(*), 'AgentWithdrawlRequest' from agentwithdrawalrequest;
select count(*), 'Auditlog' from auditlog;
select count(*), 'Bank' from bank;
select count(*), 'Billcollection' from billcollection;
select count(*), 'Branch' from branch;
select count(*), 'Clientrequestlog' from clientrequestlog;
select count(*), 'Clientresponselog' from clientresponselog;
select count(*), 'Customer' from customer;
select count(*), 'Customerqrcard' from customerqrcard;
select count(*), 'Customerqrcardlog' from customerqrcardlog;
select count(*), 'Fingerprint' from fingerprint;
select count(*), 'Fingerprintlog' from fingerprintlog;
select count(*), 'Leftmenu' from leftmenu;
select count(*), 'Login' from login;
select count(*), 'Logintrail' from logintrail;
select count(*), 'Metaproperty' from metaproperty;
select count(*), 'Requestlog' from requestlog;
select count(*), 'Responselog' from responselog;
select count(*), 'Role' from role;
select count(*), 'Topmenu' from topmenu;
select count(*), 'Translog' from translog;

select
  pgClass.relname   as tableName,
  pgClass.reltuples as rowCount
from
  pg_class pgClass
left join
  pg_namespace pgNamespace on (pgNamespace.oid = pgClass.relnamespace)
where
  pgNamespace.nspname not in ('pg_catalog', 'information_schema') and
  pgClass.relkind='r';