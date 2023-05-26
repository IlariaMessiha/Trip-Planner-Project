import _ from "lodash";

export function paginate(items:any, pageNumber:any, pageSize:any) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}


