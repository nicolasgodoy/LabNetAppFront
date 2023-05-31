import { ProfileDto } from "./ProfileDto";

export interface ProfilesFilterDto {
  profile: ProfileDto;
  key: number;
  count: number;
}
