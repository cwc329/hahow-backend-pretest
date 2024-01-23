import { Router } from 'express';
import * as helloControllers from '#controllers/hello';
import { API } from '#enums';

const hello = Router();

hello.get(API.HELLO, helloControllers.helloFriend);

export { hello };
