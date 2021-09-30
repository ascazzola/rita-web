package edu.robocode.service.application

interface IMapper<TEntity, out TModel> {
    fun map (source: TEntity): TModel
}

