import { ReadUserDto } from 'src/modules/users/dtos';

export const mockReadUserDto = (): ReadUserDto => {
  return {
    id: '777',
    name: 'name',
    username: 'username',
    email: 'email',
    rule: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    removedAt: null,
  } as ReadUserDto;
};
