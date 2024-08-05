import Home from './pages/home';
import Panel from './pages/panel';
import PAdmin from './pages/pAdmin';
import Search from './pages/search';
import NotFound from './pages/notFound';
import Courses from './pages/courses';
import courseInfo from './pages/courseInfo';
import Lesson from './pages/lesson';
import Categories from './pages/categories';
import Articles from './pages/articles';
import Teacher from './pages/teacher';
import Login from './pages/login';
import Register from './pages/register';
import Contact from './pages/terms-conditions.jsx'

const router = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Panel User',
        path: '/my-account/',
        component: Panel
    },
    {
        name: 'Panel User',
        path: '/my-account/:value',
        component: Panel
    },
    {
        name: 'Panel Admin',
        path: '/admin',
        component: PAdmin
    },
    {
        name: 'Search',
        path: '/courses/:search',  
        component: Search
    },
    {
        name: 'NotFound',
        path: '*',
        component: NotFound
    },
    {
        name: 'Course-Info',
        path: '/course/:courseName',
        component: courseInfo
    },
    {
        name: 'Course-Parts',
        path: '/lesson/:courseInfo',
        component: Lesson
    },
    {
        name: 'Courses',
        path: '/courses/',
        component: Courses
    },
    {
        name: 'Category',
        path: '/category/:categoryName/',
        component: Categories
    },
    {
        name: 'Articles',
        path: '/articles',
        component: Articles
    },
    {
        name: 'Teacher',
        path: '/teacher/:teacherName',
        component: Teacher
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    {
        name: 'Signup',
        path: '/register',
        component: Register
    },
    {
        name: 'Contact',
        path: '/terms-conditions',
        component: Contact
    }
]

export default router