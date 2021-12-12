
import request from './request.js'
export function getList(type,page){
  const param = {
    page,
    limit:6
  }
  if(type!='all'){
    param['type'] = type;
  }
  return request({
    url:'/api/passage',
    method:'get',
    params:param
  })
}
export function getContent(id){
  return request({
    url:'/api/passage/content',
    method:'get',
    params:{
      id
    }
  })
}
export function checklogin(){
  return request({
    url:'/api/user/state',
    method:'get'
  })
}
export function login(name,password){
  return request({
    url:'/api/user',
    method:'post',
    data:{
      name,
      password
    }
  })
}
export function logout(){
  return request({
    url:'/api/user',
    method:'delete'
  })
}
export function registry(name,password){
  return request({
    url:'/api/user/registry',
    method:'post',
    data:{
      name,
      password,
    }
  })
}
export function modUser(id,name,password){
  return request({
    url:'/api/user',
    method:'put',
    data:{
      id,
      name,
      password
    }
  })
}
export function addrecord(passageId,userId,wpm){
  return request({
    url:'/api/record',
    method:'put',
    data:{
      passageId,
      userId,
      wpm
    }
  })
}
export function getrecord(userId,page){
  return request({
      url:'/api/record',
      method:'get',
      params:{
        userId,
        page,
        limit:1900
      }
  })
}
export function delrecord(recordId){
  return request({
    url:`/api/record/${recordId}`,
    method:'delete',
  })
}