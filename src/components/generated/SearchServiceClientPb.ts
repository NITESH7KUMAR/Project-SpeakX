/**
 * @fileoverview gRPC-Web generated client stub for search
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v5.29.2
// source: search.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as search_pb from './search_pb'; // proto import: "search.proto"


export class SearchServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorsearchQuestions = new grpcWeb.MethodDescriptor(
    '/search.SearchService/searchQuestions',
    grpcWeb.MethodType.UNARY,
    search_pb.SearchRequest,
    search_pb.SearchResponse,
    (request: search_pb.SearchRequest) => {
      return request.serializeBinary();
    },
    search_pb.SearchResponse.deserializeBinary
  );

  searchQuestions(
    request: search_pb.SearchRequest,
    metadata?: grpcWeb.Metadata | null): Promise<search_pb.SearchResponse>;

  searchQuestions(
    request: search_pb.SearchRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: search_pb.SearchResponse) => void): grpcWeb.ClientReadableStream<search_pb.SearchResponse>;

  searchQuestions(
    request: search_pb.SearchRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: search_pb.SearchResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/search.SearchService/searchQuestions',
        request,
        metadata || {},
        this.methodDescriptorsearchQuestions,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/search.SearchService/searchQuestions',
    request,
    metadata || {},
    this.methodDescriptorsearchQuestions);
  }

}

