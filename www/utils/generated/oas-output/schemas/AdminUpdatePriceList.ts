/**
 * @schema AdminUpdatePriceList
 * type: object
 * description: the details to update in a price list.
 * x-schemaName: AdminUpdatePriceList
 * properties:
 *   title:
 *     type: string
 *     title: title
 *     description: The price list's title.
 *   description:
 *     type: string
 *     title: description
 *     description: The price list's description.
 *   starts_at:
 *     type: string
 *     title: starts_at
 *     description: The date the price list starts.
 *   ends_at:
 *     type: string
 *     title: ends_at
 *     description: The date the price list ends.
 *   status:
 *     oneOf:
 *       - type: string
 *         description: The price list's status.
 *         enum:
 *           - ACTIVE
 *       - type: string
 *         description: The price list's status.
 *         enum:
 *           - DRAFT
 *     description: The price list's status.
 *   type:
 *     oneOf:
 *       - type: string
 *         description: The price list's type.
 *         enum:
 *           - SALE
 *       - type: string
 *         description: The price list's type.
 *         enum:
 *           - OVERRIDE
 *     description: The price list's type.
 *   rules:
 *     type: object
 *     description: The price list's rules.
 *     example:
 *       customer_group_id:
 *         - cusgrp_123
 * 
*/

