# ticketmnt for nipa cloud

format body for all api - x-www-form-urlencoded

list ticket 
GET /api/ticket_list
status (optional)

create ticket
POST /api/create_ticket
title (required)
description (required)
contact (required)
information (required)


update ticket
POST /api/update_ticket
ticket_id (required) -> ใส่ id อะไรก็ได้ ถ้าเจอก็อัพเดตให้ ไม่ได้ handle ให้แสดง error แบบไหน
information (optional)
status (optional)

note: 
1. ไม่มีการ handle case html error code นอกจาก 400
2. database in localhost
![image](https://user-images.githubusercontent.com/55575850/123313026-40237700-d553-11eb-8fa2-b7bbb14befa8.png)
