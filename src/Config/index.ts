export const AppConfig = {
  API_BASE_URL: "https://sms-portal-code-test.netlify.app/api",
};

export const APIURLS = {
  users: {
    list: "/users/list",
    signup: "/users/signup",
    login: "/users/login",
    profile:"/users/profile"
  },
  jobs:{
    create:"/jobs/create",
    stop:"/jobs/stop",
    list:"/jobs/list?searchText=",
    smsListByJob:"/jobs/smslist_by_job"
  }
};
