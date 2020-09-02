package edu.robocode.service.application

import com.google.gson.*
import java.lang.reflect.Type


class BattleEventSerializer : JsonSerializer<Any>{

    override fun serialize(jsonElement: Any, type: Type, jsonSerializationContext: JsonSerializationContext): JsonElement {
        val gson = Gson()
        val serialize = gson.toJsonTree(jsonElement)
        val o = serialize as JsonObject
        val className = jsonElement.javaClass.name;
        o.addProperty("type", className.substring(className.lastIndexOf(".") + 1))
        return serialize
    }
}
