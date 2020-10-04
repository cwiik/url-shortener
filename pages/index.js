import React, { createRef, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// * NPM libraries
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Axios from 'axios';

// * Components
import Animation from '../components/Animation';
import { GenerateShortUrl } from '../components/GenerateShortUrl';

const Bg = styled(Grid)`
    && {
        min-height: 100vh;
        background-color: ${(props) => props.theme.colors.blue};
    }
`;

const TextHighlight = styled.span`
    && {
        color: ${(props) => props.theme.colors.yellow};
    }
`;

const Title = styled.h1`
    && {
        font-size: 64px;
        font-weight: 700;
        letter-spacing: 0.5rem;
        color: ${(props) => props.theme.colors.white};
        text-align: center;

        @media screen and (max-width: 600px) {
            font-size: 36px;
        }
    }
`;

const URL = styled.h2`
    && {
        font-size: 48px;
        font-weight: 700;
        color: ${(props) => props.theme.colors.white};
        text-align: center;
        cursor: pointer;

        @media screen and (max-width: 600px) {
            font-size: 24px;
        }
    }
`;

const Input = styled.input`
    && {
        margin-top: 50px;
        font-size: 24px;
        text-indent: 10px;
        text-align: center;
        color: ${(props) => props.theme.colors.white};
        background-color: rgba(0, 0, 0, 0.2);
        border: 2px solid rgba(0, 0, 0, 0.4);
        border-radius: 12px;
        width: 100%;
        height: 60px;
        &:hover {
            border: 2px solid #fca311;
        }
        &:focus {
            border: 2px solid #fca311;
        }
        &:placeholder {
            color: ${(props) => props.theme.colors.grey};
        }

        @media screen and (max-width: 600px) {
            font-size: 16px;
        }
    }
`;

const Main = () => {
    const router = useRouter();
    const inputref = createRef();
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        addDB();
    }, [shortUrl]);

    useEffect(() => {
        inputref.current.focus();
    }, []);

    const addDB = async () => {
        if (shortUrl !== '') {
            const res = await Axios.post('/api/addDB', {
                shorturl: shortUrl,
                longurl: url,
            });
            res.data.error && setErrorMessage(res.data.error);
        }
        setUrl('');
    };

    const HandleChange = debounce((inputurl) => {
        setUrl(inputurl.replace('http://', '').replace('https://', '').replace('www.', ''));
        setErrorMessage('');
        setShortUrl(GenerateShortUrl());
    }, 1000);

    return (
        <>
            <Head>
                <link rel='canonical' href='' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <title>URL SHORTENER | EVERYONE LOVES SHORT URLS</title>
                <meta name='description' content='Make your URLs short and clean with us.' />
                <meta name='keywords' content='url, shortener, shrink'></meta>
                <meta name='robots' content='index, follow' />
                <meta property='og:locale' content='en_EN' />
                <meta property='og:site_name' content='EVERYONE LOVES SHORT URLS' />
                <meta property='og:title' content='URL SHORTENER | EVERYONE LOVES SHORT URLS' />
                <meta property='og:description' content='Make your URLs short and clean with us.' />
                <meta property='og:url' content='' />
                <meta property='og:image' content='' />
            </Head>
            <Bg container direction='column' justify='center' alignItems='center'>
                <Grid xs={10} container item direction='row' justify='center' alignItems='center'>
                    <Grid item xs={12} md={10} lg={7} xl={6}>
                        <Title>
                            EVERYONE LOVES SHORT <TextHighlight>URL</TextHighlight>S
                        </Title>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container item justify='center' alignItems='center'>
                            <Animation />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8} lg={4}>
                        <form>
                            <Input
                                type='text'
                                onChange={(e) => HandleChange(e.target.value)}
                                ref={inputref}
                                placeholder='LONG URL here and we do the rest ❤️'
                            />
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <CopyToClipboard text={`https://url-shortener-three.vercel.app/${shortUrl}`}>
                            <URL>
                                {!errorMessage && shortUrl ? (
                                    <Link href={`/${shortUrl}`}>
                                        <a
                                            target='_blank'
                                            style={{ color: '#fff' }}
                                        >{`https://url-shortener-three.vercel.app/${shortUrl}`}</a>
                                    </Link>
                                ) : (
                                    errorMessage
                                )}
                            </URL>
                        </CopyToClipboard>
                    </Grid>
                </Grid>
            </Bg>
        </>
    );
};

export default Main;
