import { NextRequest } from 'next/server';

type SearchUserParams = {
  queryString: string;
  participants: string;
};

export interface IRequest extends NextRequest {
  json: () => Promise<SearchUserParams>;
}
