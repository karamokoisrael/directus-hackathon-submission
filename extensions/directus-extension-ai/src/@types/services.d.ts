import { Knex } from "knex";
import {
  Accountability,
  Item,
  PrimaryKey,
  Query,
  SchemaOverview,
} from "@directus/shared/types";

export type AbstractServiceOptions = {
  knex?: Knex;
  accountability?: Accountability | null;
  schema: SchemaOverview;
};

export interface AbstractService {
  knex: Knex;
  accountability: Accountability | null;

  createOne(data: Partial<Item>): Promise<PrimaryKey>;
  createMany(data: Partial<Item>[]): Promise<PrimaryKey[]>;

  readOne(key: PrimaryKey, query?: Query): Promise<Item>;
  readMany(keys: PrimaryKey[], query?: Query): Promise<Item[]>;
  readByQuery(query: Query): Promise<Item[]>;

  updateOne(key: PrimaryKey, data: Partial<Item>): Promise<PrimaryKey>;
  updateMany(keys: PrimaryKey[], data: Partial<Item>): Promise<PrimaryKey[]>;
  updateByQuery(query: Query, data: Partial<Item>): Promise<PrimaryKey[]>;

  deleteOne(key: PrimaryKey): Promise<PrimaryKey>;
  deleteMany(keys: PrimaryKey[]): Promise<PrimaryKey[]>;
}

export interface DirectusServices {
  MailService: any;
  GraphQLService: any;
  ActivityService: any;
  AssetsService: any;
  AuthenticationService: any;
  AuthorizationService: any;
  CollectionsService: any;
  DashboardsService: any;
  FieldsService: any;
  FilesService: any;
  FlowsService: any;
  FoldersService: any;
  ImportService: any;
  ExportService: any;
  ItemsService: any;
  MetaService: any;
  NotificationsService: any;
  OperationsService: any;
  PanelsService: any;
  PayloadService: any;
  PermissionsService: any;
  PresetsService: any;
  RelationsService: any;
  RevisionsService: any;
  RolesService: any;
  SchemaService: any;
  ServerService: any;
  SettingsService: any;
  SharesService: any;
  SpecificationService: any;
  TFAService: any;
  UsersService: any;
  UtilsService: any;
  WebhooksService: any;
}
