#�û�ע��

##URL
users/register

##Method
POST

##parameter
username
password
phonenumber
email

##Response
ע��ɹ�������json��ʽ{'status' : 'successful'}
ע��ʧ�ܣ�����json��ʽ{'status' : 'failed'}

#�û���¼

##URL
users/login

##Method
POST

##parameter
username
password

##Response
��¼�ɹ�������json��ʽ{'toeken' : token}
��¼ʧ�ܣ�����json��ʽ{'status' : 'failed'}

#�����û���Ϣ

##URL
users/getinfo

##Method
POST

##parameter
token

##Response
�û���Ϣ��username phonenumber email

��ʽ��json

#��̨����

#URL
/admin

#superuser

username:admin

password:waitlove

email:admin@admin.com

