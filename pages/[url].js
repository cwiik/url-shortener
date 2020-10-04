import Axios from 'axios';
import { useRouter } from 'next/router';
const RedirectToUrl = (props) => {
    // const router = useRouter();
    // router.replace(props.url2);
    return;
};
RedirectToUrl.getInitialProps = async ({ req, res, query }) => {
    const res2 = await Axios.get(`https://url-shortener-three.vercel.app/api/${query.url}`);
    if (res2.data.error) {
        res.writeHead(301, {
            Location: `/`,
        });
        res.end();
    } else {
        res.writeHead(301, {
            Location: `http://www.${res2.data}`,
        });
        res.end();
    }

    return;
};
export default RedirectToUrl;
