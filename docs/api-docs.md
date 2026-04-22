# API 接口文档

## 全局请求规范

### 请求头 (Headers)
所有请求必须包含以下 Header 信息：
| Key | Value | 说明 |
|-----|-------|------|
| `Content-Type` | `application/json` | 默认数据格式 |
| `Authorization` | `Bearer <token>` | 登录成功后获取的 Token |

### 标准响应格式
成功响应示例：
{
  "success": true,
  "data": { ... },
  "message": "操作成功"
}

失败响应示例：
{
  "success": false,
  "error": "参数不能为空",
  "code": 400
}

### 通用错误码
| Code | 含义 | 说明 |
|------|------|------|
| 200 | OK | 请求成功 |
| 400 | Bad Request | 参数错误或格式不正确 |
| 401 | Unauthorized | 未登录或 Token 失效 |
| 403 | Forbidden | 权限不足 |
| 404 | Not Found | 请求的资源不存在 |
| 500 | Internal Error | 服务器内部错误 |

## 认证登录接口

### 湖南科技大学统一认证登录
POST /api/auth/hnust

描述：通过湖南科技大学统一身份认证系统进行登录。

请求参数：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | String | 是 | 湖南科技大学统一认证账号（学号/工号） |
| password | String | 是 | 湖南科技大学统一认证密码 |
| wecom_code | String | 否 | 企业微信授权码（如使用企业微信登录） |

响应示例：
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 123,
      "name": "张三",
      "studentId": "2020000000",
      "college": "计算机科学与工程学院",
      "major": "计算机科学与技术",
      "avatar": "https://example.com/avatar.jpg"
    }
  },
  "message": "登录成功"
}

错误响应示例：
{
  "success": false,
  "error": "用户名或密码错误",
  "code": 401
}

## 业务接口详情

### 发布招募帖
POST /api/publish/create

描述：创建一个新的招募帖。

请求参数 (Body - JSON)：
{
  "title": "前端开发组招人",
  "desc": "需要会Vue和React",
  "tags": ["竞赛", "运动"],
  "requirements": [
    {
      "content": "熟悉JavaScript"
    }
  ],
  "qrcode": "data:image/png;base64,...",
  "userName": "张三",
  "userMajor": "计算机科学"
}

响应示例：
{
  "success": true,
  "message": "发布成功"
}

### 简历管理
所有简历接口均需携带 Token 访问。

#### 获取简历
GET /api/resume/get

响应示例：
{
  "success": true,
  "data": {
    "name": "张三",
    "major": "计算机科学",
    "skills": ["Vue", "React", "Node.js"],
    "awards": ["校级一等奖", "省级二等奖"]
  }
}

#### 更新简历
PUT /api/resume/update

响应示例：
{
  "success": true,
  "message": "更新成功"
}

### 意见反馈
POST /api/feedback/send

描述：用户提交意见反馈。

请求参数：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | String | 是 | 反馈的具体内容 |

响应示例：
{
  "success": true,
  "message": "感谢您的反馈"
}

## 数据模型定义

### 用户信息 (User)
{
  "id": 1,
  "name": "张三",
  "studentId": "2020000000",
  "college": "计算机科学与工程学院",
  "major": "计算机科学与技术",
  "avatar": "https://example.com/avatar.jpg",
  "role": "student"
}

### 招募帖 (PublishPost)
{
  "id": 123,
  "title": "前端开发组招人",
  "desc": "需要会Vue和React",
  "tags": ["竞赛", "运动"],
  "requirements": [
    {
      "content": "熟悉JavaScript"
    }
  ],
  "qrcode": "data:image/png;base64,...",
  "userName": "张三",
  "userMajor": "计算机科学",
  "time": "刚刚",
  "count": "0/3"
}

### 简历 (Resume)
{
  "name": "张三",
  "major": "计算机科学",
  "skills": ["Vue", "React", "Node.js"],
  "awards": ["校级一等奖", "省级二等奖"]
}

## 前端调用示例

### 湖南科技大学登录示例
async function loginWithHnust(username, password) {
  try {
    const res = await fetch('/api/auth/hnust', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    
    const result = await res.json();
    if (result.success) {
      // 保存 Token
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      alert('登录成功！');
      return true;
    } else {
      alert('登录失败: ' + result.error);
      return false;
    }
  } catch (err) {
    console.error('请求出错:', err);
    return false;
  }
}

### 发布招募帖示例
async function publishRecruit(data) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('请先登录');
      return;
    }
    
    const res = await fetch('/api/publish/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    });
    
    const result = await res.json();
    if (result.success) {
      alert('发布成功！');
    } else {
      alert('发布失败: ' + result.error);
    }
  } catch (err) {
    console.error('请求出错:', err);
  }
}

## 注意事项

1. **认证安全**：
   - 所有接口均需携带有效的 Authorization Token
   - Token 有效期为 2 小时，过期需重新登录
   - 建议使用 HTTPS 加密传输

2. **错误处理**：
   - 前端需统一处理 401 错误（跳转登录）
   - 网络异常需友好提示用户
   - 敏感信息不得明文存储