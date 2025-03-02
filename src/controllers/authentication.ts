import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';

dotenv.config();

const githubAuthUrl = 'https://github.com/login/oauth/authorize';
const githubTokenUrl = 'https://github.com/login/oauth/access_token';
const githubUserUrl = 'https://api.github.com/user';

export const githubAuth = (req: Request, res: Response) => {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    scope: 'read:user user:email',
  };
  const queryParams = querystring.stringify(params);
  res.redirect(`${githubAuthUrl}?${queryParams}`);
};

export const githubAuthCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  if (typeof code !== 'string') {
    return res.status(400).send('Invalid code');
  }

  try {
    const response = await axios.post(
      githubTokenUrl,
      querystring.stringify({
        code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_uri: process.env.CALLBACK_URL,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }
    );

    const { access_token } = response.data;
    const userResponse = await axios.get(githubUserUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
      },
    });

    req.session.user = userResponse.data;
    res.redirect('/auth/success');
  } catch (error) {
    console.error('Error during GitHub OAuth callback:', error);
    res.redirect('/auth/github');
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
