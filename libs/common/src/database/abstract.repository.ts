import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(data: Omit<TDocument, '_id'>): Promise<TDocument> {
    this.logger.debug(`Creating a new document`);
    const createdDocument = new this.model({
      ...data,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()) as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    this.logger.debug(`Finding a document`);
    const document = await this.model.findOne(filterQuery).lean<TDocument>();

    if (!document) {
      this.logger.debug(`Document not found`);
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    this.logger.debug(`Finding and updating a document`);
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<TDocument>();

    if (!document) {
      this.logger.debug(`Document not found`);
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    this.logger.debug(`Finding documents`);
    const document = this.model.find(filterQuery).lean<TDocument[]>();

    if (!document) {
      this.logger.debug(`Document not found`);
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    this.logger.debug(`Finding and deleting a document`);
    return await this.model.findOneAndDelete(filterQuery).lean<TDocument>();
  }
}
